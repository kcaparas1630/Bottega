import { api } from '@/shared/api/trpc-react';

export const useAskShopkeeper = api.shopkeeper.ask.useMutation;
