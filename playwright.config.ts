import { defineConfig, devices } from '@playwright/test';

// Proyectos de spec.md: con y sin JavaScript, movimiento reducido y móvil.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4321' },
  webServer: { command: 'bunx astro preview --port 4321', port: 4321, reuseExistingServer: true },
  projects: [
    { name: 'js', use: { ...devices['Desktop Chrome'] } },
    { name: 'sin-js', use: { ...devices['Desktop Chrome'], javaScriptEnabled: false } },
    { name: 'movimiento-reducido', use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
});
