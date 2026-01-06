import { Request, Response } from 'express';
import Trainer from './trainerModel';

// --------------------------------------------------
// GET ALL TRAINERS
// --------------------------------------------------
export const trainer = async (req: Request, res: Response) => {
  console.log('GET /trainer')

  try {
    const trainers = await Trainer.find({}).sort({ name: 1 }).select('-password -__v');
    return res.json(trainers);
  } catch (error: any) {
    console.error('Error fetching trainers:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// --------------------------------------------------
// GET ONE TRAINER BY NAME
// --------------------------------------------------
export const findOneTrainer = async (req: Request, res: Response) => {
  console.log('GET /trainer/:name', req.params.name);

  if (!req.params?.name) {
    return res.status(400).json({ message: 'Trainer name is required.' });
  }

  console.log('findOneTrainer:', JSON.stringify(req.params));

  try {
    const trainer = await Trainer.findOne({ name: req.params.name }).select('-password -__v');

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    return res.json(trainer);
  } catch (error: any) {
    console.error('Error fetching trainer:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// --------------------------------------------------
// STATIC ACCESS BOARDS
// --------------------------------------------------

export const trainerBoard = (req: Request, res: Response) => {
  return res.status(200).send('Trainer Content.');
};

export const adminBoard = (req: Request, res: Response) => {
  return res.status(200).send('Admin Content.');
};

export const moderatorBoard = (req: Request, res: Response) => {
  return res.status(200).send('Moderator Content.');
};