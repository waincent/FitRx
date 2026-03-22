import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import type { App } from 'vue';

import 'primeicons/primeicons.css';

export function initPrimeVue(app: App) {
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura,
    },
  });
}
