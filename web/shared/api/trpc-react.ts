import type { AppRouter } from '@bottega/server';
import { createTRPCReact } from '@trpc/react-query';

// Typed React hooks for every server procedure; only entities may call them.
export const api = createTRPCReact<AppRouter>();
