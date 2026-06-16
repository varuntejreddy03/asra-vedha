/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServerApp } from './app';
import { env, isProduction } from './config';

async function runServer() {
  const app = createServerApp();

  if (!isProduction) {
    console.log('Mounting Vite dev middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    console.log('Production build configured. Serving static dist files...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(env.port, '0.0.0.0', () => {
    console.log(`ASRA VEDHA server running on port ${env.port}`);
  });
}

runServer().catch((error) => {
  console.error('Fatal server startup error:', error);
  process.exitCode = 1;
});
