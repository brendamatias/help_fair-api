import { Schema, model, Document } from 'mongoose';

export type Measure = 'un' | 'l' | 'kg';
export type Category = 'fruit' | 'bakery' | 'vegetable' | 'drink' | 'meat' | 'unknown';

export interface IFairProduct extends Document {
  name: string;
  price: number;
  qty: number;
  bought: boolean;
  measure: Measure;
  category: Category;
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
  measure: {
    type: String,
    enum: ['un', 'l', 'kg'],
  },
  category: {
    type: String,
    enum: ['fruit', 'bakery', 'vegetable', 'drink', 'meat', 'unknown'],
    default: 'unknown',
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
