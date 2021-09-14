import { Response } from 'express';

const sendError = (res: Response, e: any) => {
  const statusCode: number = e.code;
  res.status(statusCode).send(e.message);
};

export { sendError };
