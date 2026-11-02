import { api } from '@/shared/api/trpc-react';

export const useAskShopkeeper = api.shopkeeper.ask.useMutation;
export const useGetShopkeeperConversation = api.shopkeeper.conversation.useQuery;
