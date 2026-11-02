import { api } from '@/shared/api/trpc-react';

// Places a demo order: nothing is charged and nothing ships.
export const usePlaceDemoOrder = api.order.placeDemo.useMutation;
