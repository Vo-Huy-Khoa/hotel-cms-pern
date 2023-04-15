import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader?.split(' ')[1] || '';
  if (!token) {
    res.status(401).json({ message: 'Token is not provided' });
  }
  try {
    const key = process.env.JWT_SECRET || '';
    const isVeriToken = jwt.verify(token, key);
    if (isVeriToken) {
      next();
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

export { authToken };
