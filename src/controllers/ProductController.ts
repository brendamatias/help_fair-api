import { NextFunction, Request, Response } from 'express';
import mediator from '@/mediators/Products';

const ProductController = {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.All();

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },
};

export default ProductController;
