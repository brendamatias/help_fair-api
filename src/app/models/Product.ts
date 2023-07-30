import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

ProductSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) this.createdAt = now;

  return next();
});

export default model<IProduct>('Product', ProductSchema);
