import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  checkPassword: (password: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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

UserSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) this.createdAt = now;
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  return next();
});

UserSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this.id }, `${env.APP_SECRET}`, {
    expiresIn: '7d',
  });
};

export default model<IUser>('User', UserSchema);
