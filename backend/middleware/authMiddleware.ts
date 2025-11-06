import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
  if (!process.env.JWT_SECRET)
    return res.status(500).json({ message: 'JWT secret not configured' });

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req = { ...req, user: decoded };
    console.log('Decoded token:', decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
