import * as Sentry from '@sentry/vue';
import type { App } from 'vue';
import type { Router } from 'vue-router';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const environment = import.meta.env.MODE;

export function initSentry(app: App, router: Router) {
  if (!sentryDsn) {
    return;
  }

  Sentry.init({
    app,
    dsn: sentryDsn,
    environment,
    integrations: [
      Sentry.vueIntegration({
        app,
        attachProps: true,
      }),
      Sentry.browserTracingIntegration({
        router,
      }),
    ],
    tracesSampleRate: 0.1,
  });
}
