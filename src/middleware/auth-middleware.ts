import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/errors';
import jwt from 'jsonwebtoken';

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error('missing header token');
    }
    jwt.verify(token as string, process.env.JWT_SECRET!);
    next();
  } catch (e) {
    sendError(res, e);
  }
};
