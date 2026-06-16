import type { NextFunction, Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Role, type User as PrismaUser } from '@prisma/client';
import { env, isProduction } from './config';
import { HttpError } from './http';
import { prisma } from './prisma';

export const authCookieName = 'asra_token';

type JwtPayload = {
  sub: string;
  role: Role;
};

declare global {
  namespace Express {
    interface Request {
      authUser?: PrismaUser;
    }
  }
}

export function configurePassport() {
  if (!env.googleClientId || !env.googleClientSecret) {
    return false;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) {
            return done(new Error('Google profile did not include an email address'));
          }

          const user = await prisma.user.upsert({
            where: { email },
            update: {
              googleId: profile.id,
              name: profile.displayName || email,
              avatar: profile.photos?.[0]?.value
            },
            create: {
              googleId: profile.id,
              email,
              name: profile.displayName || email,
              avatar: profile.photos?.[0]?.value,
              role: email === env.adminEmail.toLowerCase() ? Role.admin : Role.customer
            }
          });

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  return true;
}

export function signAuthToken(user: Pick<PrismaUser, 'id' | 'role'>) {
  const payload: JwtPayload = {
    sub: user.id,
    role: user.role
  };
  const options: SignOptions = { expiresIn: env.jwtExpiry as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwtSecret, options);
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(authCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(authCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction
  });
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[authCookieName];
    if (!token) {
      throw new HttpError(401, 'Authentication required');
    }

    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new HttpError(401, 'Authentication required');
    }

    req.authUser = user;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    next(new HttpError(401, 'Invalid or expired session'));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.authUser) {
    next(new HttpError(401, 'Authentication required'));
    return;
  }

  if (req.authUser.role !== Role.admin) {
    next(new HttpError(403, 'Admin access required'));
    return;
  }

  next();
}
