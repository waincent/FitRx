import { beforeAll } from 'vitest';
import { createI18n } from 'vue-i18n';

import { config } from '@vue/test-utils';
import axios from 'axios';

const createStorageMock = (): Storage => {
  const storage = new Map<string, string>();

  return {
    get length() {
      return storage.size;
    },
    clear() {
      storage.clear();
    },
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
    key(index: number) {
      return [...storage.keys()][index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(key);
    },
    setItem(key: string, value: string) {
      storage.set(key, String(value));
    },
  };
};

beforeAll(() => {
  globalThis.location.href = 'https://jhipster.tech/';

  if (typeof globalThis.localStorage?.clear !== 'function') {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    });
  }

  if (typeof globalThis.sessionStorage?.clear !== 'function') {
    Object.defineProperty(globalThis, 'sessionStorage', {
      configurable: true,
      value: createStorageMock(),
    });
  }

  // Make sure axios is never executed.
  axios.interceptors.request.use(request => {
    throw new Error(`Error axios should be mocked ${request.url}`);
  });

  config.global.plugins.push(
    createI18n({
      legacy: false,
      missingWarn: false,
      fallbackWarn: false,
    }),
  );
});
