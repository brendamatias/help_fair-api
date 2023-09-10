import { NextFunction, Request, Response } from 'express';
import mediator from '../mediators/Fairs';

const FairController = {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.All(request.userId);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Show(request.params.id);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Store({ ...request.body, userId: request.userId });

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Delete(request.params.id, request.userId);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },
};

export default FairController;
