import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const createRouter = trpc.router;
// Open to every visitor; add an auth middleware here once accounts exist.
export const publicProcedure = trpc.procedure;
