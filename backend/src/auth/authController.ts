import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../middleware/authConfig';
import Trainer, { ITrainer } from '../trainer/trainerModel';

// Extend Express Request to include userId from auth middleware
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

interface DecodedToken extends JwtPayload {
  id: string;
}

function verifyRefreshToken(token: string): Promise<DecodedToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.refresh, (err, decoded) => {
      if (err || !decoded) return reject(err);
      resolve(decoded as DecodedToken);
    });
  });
}

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'name and password are required.' });
    }

    const normalizedName = name.trim();
    const trainer = await Trainer.findOne({ name: normalizedName })
      .populate('roles')

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    const passwordIsValid = await bcrypt.compare(password, trainer.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const accessToken = jwt.sign(
      { id: trainer._id },
      config.secret,
      { expiresIn: '15m', subject: trainer.name }
    );

    const refreshToken = jwt.sign(
      { id: trainer._id },
      config.refresh,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ token: accessToken });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------
// CHANGE PASSWORD
// --------------------------------------------------
export const changePW = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { password, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!password || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    const trainer = await Trainer.findById(userId)
      .select('+password')
      .populate('roles');

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    const passwordIsValid = await bcrypt.compare(password, trainer.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    trainer.password = await bcrypt.hash(newPassword, 10);
    await trainer.save();

    const newAccessToken = jwt.sign(
      { id: trainer._id },
      config.secret,
      { expiresIn: '15m' }
    );

    return res.json({ token: newAccessToken });

  } catch (error) {
    console.error('Change Password error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------
// REFRESH TOKEN
// --------------------------------------------------
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const decoded = await verifyRefreshToken(refreshToken);

    const trainer = await Trainer.findById(decoded.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const newAccessToken = jwt.sign(
      { id: trainer._id },
      config.secret,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { id: trainer._id },
      config.refresh,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ token: newAccessToken });

  } catch (error: any) {
    console.error('Refresh error:', error);
    return res.status(
      error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError'
        ? 403
        : 500
    ).json({ error: 'Internal Server Error' });
  }
};

// --------------------------------------------------
// REGISTER
// --------------------------------------------------
export const register = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'name and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const normalizedName = name.trim();
    const existing = await Trainer.findOne({ name: normalizedName });

    if (existing) {
      return res.status(409).json({ message: 'Name already taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newTrainer = new Trainer({
      name: normalizedName,
      password: passwordHash,
      roles: ['trainer']
    });

    await newTrainer.save();

    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};