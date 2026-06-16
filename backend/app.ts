import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import passport from 'passport';
import { configurePassport, requireAdmin, requireAuth } from './auth';
import { env, isProduction } from './config';
import { errorHandler, notFoundHandler } from './http';
import adminRouter from './routes/admin';
import { createAuthRouter } from './routes/auth';
import consultRouter from './routes/consult';
import productsRouter from './routes/products';
import publicRouter from './routes/public';
import usersRouter from './routes/users';

export function createServerApp() {
  const app = express();
  const googleEnabled = configurePassport();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
  app.use(compression());
  app.use(
    cors({
      origin: isProduction ? env.frontendUrl : true,
      credentials: true
    })
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(passport.initialize());

  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 500,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'asra-vedha-api' });
  });

  app.use('/api/auth', createAuthRouter(googleEnabled));
  app.use('/api', productsRouter);
  app.use('/api', publicRouter);
  app.use('/api', consultRouter);
  app.use('/api', requireAuth, usersRouter);
  app.use('/api/admin', requireAuth, requireAdmin, adminRouter);
  app.use('/api', notFoundHandler);
  app.use(errorHandler);

  return app;
}
