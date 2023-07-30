type Api = {
  status: number;
  message: string;
};

class ApiError extends Error {
  public statusCode: number;

  constructor({ status, message }: Api) {
    super(message);
    this.statusCode = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
