import { keepPreviousData } from '@tanstack/react-query';

import { api } from '@/shared/api/trpc-react';

// Lists shelf photos from one source, keeping the last results on screen while a search runs.
export const useListPhotos = (input: Parameters<typeof api.photo.list.useQuery>[0]) =>
  api.photo.list.useQuery(input, { placeholderData: keepPreviousData });
