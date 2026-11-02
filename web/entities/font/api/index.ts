import { keepPreviousData } from '@tanstack/react-query';

import { api } from '@/shared/api/trpc-react';

// Searches the Google Fonts catalogue, keeping the last page on screen while the next loads.
export const useListFonts = (input: Parameters<typeof api.font.list.useQuery>[0]) =>
  api.font.list.useQuery(input, { placeholderData: keepPreviousData });
