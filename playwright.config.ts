import { defineConfig, devices } from '@playwright/test';

// Proyectos de spec.md: con y sin JavaScript, movimiento reducido y móvil.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  // T256: las pruebas no envían visitas a Cloudflare Web Analytics; el navegador no resuelve sus dominios.
  use: { baseURL: 'http://localhost:4321', launchOptions: { args: ['--host-resolver-rules=MAP static.cloudflareinsights.com ~NOTFOUND, MAP cloudflareinsights.com ~NOTFOUND'] } },
  webServer: { command: 'bunx astro preview --port 4321', port: 4321, reuseExistingServer: true },
  projects: [
    { name: 'js', use: { ...devices['Desktop Chrome'] } },
    { name: 'sin-js', use: { ...devices['Desktop Chrome'], javaScriptEnabled: false } },
    { name: 'movimiento-reducido', use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
});
