import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from './authConfig';
import Trainer from '../trainer/trainerModel';

// Extend Express Request to include trainerId
declare module 'express-serve-static-core' {
  interface Request {
    trainerId?: string;
  }
}

interface DecodedToken extends JwtPayload {
  id: string;
}

// --------------------------------------------------
// VERIFY TOKEN
// --------------------------------------------------
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers as any).Authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = authHeader.slice(7).trim();

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err || !decoded) {
      console.log('JWT error:', err);
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    const payload = decoded as DecodedToken;
    req.trainerId = payload.id;

    next();
  });
};

// --------------------------------------------------
// ROLE CHECK HELPERS
// --------------------------------------------------
async function userHasRole(trainerId: string, allowedRoles: string[]): Promise<boolean> {
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) return false;

  const roles = trainer.roles;
  return allowedRoles.some(role => roles.includes(role));
}

// --------------------------------------------------
// ADMIN CHECK
// --------------------------------------------------
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.trainerId) {
      return res.status(403).json({ message: 'Require Admin Role!' });
    }

    const ok = await userHasRole(req.trainerId, ['admin']);
    if (!ok) {
      return res.status(403).json({ message: 'Require Admin Role!' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// --------------------------------------------------
// MODERATOR CHECK
// --------------------------------------------------
export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.trainerId) {
      return res.status(403).json({ message: 'Require Mod Role!' });
    }

    const ok = await userHasRole(req.trainerId, ['moderator', 'admin']);
    if (!ok) {
      return res.status(403).json({ message: 'Require Mod Role!' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// --------------------------------------------------
// EXPORT AS GROUP
// --------------------------------------------------
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

export default authJwt;