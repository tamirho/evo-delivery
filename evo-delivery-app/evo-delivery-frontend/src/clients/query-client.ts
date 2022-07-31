import { QueryClient } from '@tanstack/react-query';

const second = 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * second,
    },
  },
});
