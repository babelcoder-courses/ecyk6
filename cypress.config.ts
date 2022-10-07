import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    apiUrl: 'http://127.0.0.1:5000/api/v1',
  },
  retries: 3,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
