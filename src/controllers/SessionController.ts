import { NextFunction, Request, Response } from 'express';
import mediator from '../mediators/Sessions';

const SessionController = {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { status, data } = await mediator.Store(request.body);

      return response.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  },
};

export default SessionController;
