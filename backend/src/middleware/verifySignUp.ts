import { Request, Response, NextFunction } from 'express';
import Trainer from '../trainer/trainerModel';

const ROLES = ['trainer', 'admin', 'moderator'] as const;

// --------------------------------------------------
// CHECK DUPLICATE TRAINER NAME
// --------------------------------------------------
export const checkDuplicateTrainernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const trainer = await Trainer.findOne({ name });

    if (trainer) {
      console.log('Trainer found:', trainer);
      return res.status(400).json({ message: 'Failed! Trainer name is already in use!' });
    }

    next();
  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// --------------------------------------------------
// CHECK ROLES EXIST
// --------------------------------------------------
export const checkRolesExisted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles = req.body.roles;

  if (roles && Array.isArray(roles)) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        return res.status(400).json({
          message: `Failed! Role ${role} does not exist!`
        });
      }
    }
  }

  next();
};

// --------------------------------------------------
// EXPORT AS GROUP
// --------------------------------------------------
const verifySignUp = {
  checkDuplicateTrainernameOrEmail,
  checkRolesExisted
};

export default verifySignUp;