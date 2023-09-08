import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const config = {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};

const promisify = (token: string, secret: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });

const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  if (!config.secret) return response.status(401).json({ error: 'Secret invalid.' });

  try {
    const decoded = await promisify(token, config.secret);

    // @ts-ignore
    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid.' });
  }
};

export default authMiddleware;
