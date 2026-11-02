import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';

import { shopkeeperTurnSchema, type ShopkeeperTurn } from './shopkeeper-design-schema';

const SHOPKEEPER_MODEL = 'claude-sonnet-5';
const MAX_OUTPUT_TOKENS = 16000;
const SHOPKEEPER_TURN_FORMAT = zodOutputFormat(shopkeeperTurnSchema);

let anthropicClient: Anthropic | null = null;

// Created on first use, so missing credentials fail one question rather than the whole API.
function getAnthropicClient() {
  anthropicClient ??= new Anthropic();
  return anthropicClient;
}

export type ShopkeeperModelAnswer = {
  // Null when the model refused, ran out of tokens or broke the schema.
  turn: ShopkeeperTurn | null;
  content: Anthropic.ContentBlock[];
};

function readTurn(response: Anthropic.Message): ShopkeeperTurn | null {
  if (response.stop_reason !== 'end_turn') {
    console.warn(`Shopkeeper turn stopped early: ${response.stop_reason ?? 'unknown'}`);
    return null;
  }
  const answerText = response.content.find((block) => block.type === 'text')?.text;
  if (!answerText) return null;
  try {
    return SHOPKEEPER_TURN_FORMAT.parse(answerText);
  } catch (parseError) {
    console.warn('Shopkeeper turn broke the schema', parseError);
    return null;
  }
}

// One turn of the conversation; the format makes Claude answer as a ShopkeeperTurn.
export async function askShopkeeperModel(
  instructions: string,
  messages: Anthropic.MessageParam[],
): Promise<ShopkeeperModelAnswer> {
  const response = await getAnthropicClient().messages.create({
    model: SHOPKEEPER_MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    cache_control: { type: 'ephemeral' },
    system: instructions,
    messages,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'medium', format: SHOPKEEPER_TURN_FORMAT },
  });
  return { turn: readTurn(response), content: response.content };
}
