// Packages
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_KEY as string;

export const ProtectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');

  if (!token) {
      return res.status(403).json({ message: 'Authorization token not found.' });
  }

  jwt.verify(token, JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // @ts-ignore
    req.user = decoded;
  })
  next();
}