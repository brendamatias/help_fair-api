import { NextFunction, Request, Response } from 'express';
import mediator from '../mediators/FairProducts';

const FairProductController = {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.All(request.params.fairId);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Update({
        ...request.body,
        id: request.params.id,
        fair: request.params.fairId,
      });

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Store({ ...request.body, fair: request.params.fairId });

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Delete(request.params.id);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },
};

export default FairProductController;
