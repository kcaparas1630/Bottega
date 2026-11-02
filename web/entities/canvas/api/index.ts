import { api } from '@/shared/api/trpc-react';

export const useGetCanvas = api.canvas.get.useQuery;
export const useSaveCanvas = api.canvas.save.useMutation;
