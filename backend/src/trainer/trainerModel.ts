import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface ITrainer extends Document {
  name: string;
  password: string;
  roles: string[];
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['trainer'] }
  }
);

const Trainer = mongoose.model<ITrainer>('Trainer', TrainerSchema) as Model<ITrainer>;

export default Trainer;