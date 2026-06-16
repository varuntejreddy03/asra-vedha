import passport from 'passport';
import { Router } from 'express';
import type { User as PrismaUser } from '@prisma/client';
import { clearAuthCookie, requireAuth, setAuthCookie, signAuthToken } from '../auth';
import { env } from '../config';
import { HttpError, asyncHandler } from '../http';

export function createAuthRouter(googleEnabled: boolean) {
  const router = Router();

  router.get('/google', (req, res, next) => {
    if (!googleEnabled) {
      next(new HttpError(501, 'Google OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.'));
      return;
    }

    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false
    })(req, res, next);
  });

  router.get('/google/callback', (req, res, next) => {
    if (!googleEnabled) {
      next(new HttpError(501, 'Google OAuth is not configured.'));
      return;
    }

    passport.authenticate('google', { session: false }, (error: Error | null, user?: PrismaUser) => {
      if (error || !user) {
        next(error || new HttpError(401, 'Google sign-in failed.'));
        return;
      }

      const token = signAuthToken(user);
      setAuthCookie(res, token);
      res.redirect(`${env.frontendUrl}/?auth=success`);
    })(req, res, next);
  });

  router.get(
    '/me',
    requireAuth,
    asyncHandler(async (req, res) => {
      const user = req.authUser!;
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          phone: user.phone,
          role: user.role
        }
      });
    })
  );

  router.post('/logout', (_req, res) => {
    clearAuthCookie(res);
    res.json({ ok: true });
  });

  return router;
}
