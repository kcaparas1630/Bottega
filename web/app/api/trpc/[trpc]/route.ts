import { appRouter } from '@bottega/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// The only place web code runs the server package; see docs/adr/002.
function handleTrpcRequest(request: Request) {
  return fetchRequestHandler({ endpoint: '/api/trpc', req: request, router: appRouter });
}

export { handleTrpcRequest as GET, handleTrpcRequest as POST };
