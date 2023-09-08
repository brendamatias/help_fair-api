import { Schema, model, Document } from 'mongoose';

export interface IFair extends Document {
  name: string;
  status: 'IN_PROGRESS' | 'FINISHED';
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FairSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['IN_PROGRESS', 'FINISHED'],
    default: 'IN_PROGRESS',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

FairSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) this.createdAt = now;

  return next();
});

export default model<IFair>('Fair', FairSchema);
