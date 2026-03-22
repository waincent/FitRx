import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import type { App } from 'vue';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function initVueQuery(app: App) {
  app.use(VueQueryPlugin, {
    queryClient,
  });
}
