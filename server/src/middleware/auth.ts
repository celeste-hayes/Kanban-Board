import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Get the token
    const token = authHeader.split(' ')[1];
    // Get the secret key
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ message: 'Token invalid' });
      }
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401).json({ message: 'Unauthorized'});
  }
};
