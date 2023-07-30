import { Schema, model, Document } from 'mongoose';

export interface IFairProduct extends Document {
  name: string;
  price: number;
  qty: number;
  bought: boolean;
  fair: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FairProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  qty: {
    type: Number,
    default: 0,
  },
  bought: {
    type: Boolean,
    default: false,
  },
  fair: {
    type: Schema.Types.ObjectId,
    ref: 'Fair',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

FairProductSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) this.createdAt = now;

  return next();
});

export default model<IFairProduct>('FairProduct', FairProductSchema);
