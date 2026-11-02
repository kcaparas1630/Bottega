import { api } from '@/shared/api/trpc-react';

export const useListProducts = api.product.list.useQuery;
