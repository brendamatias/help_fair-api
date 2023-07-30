/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

type Error = {
  message: string;
  statusCode: number;
};

const handleError = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') console.log(error);

  return response.status(error.statusCode || 500).json({
    error: {
      message: error.message,
    },
  });
};

export default handleError;
