import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/db';
import { AuthRequest } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'college_library_secret_key_2025_secure';

export const login = (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const users = db.get('users');
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase().trim()
  );

  if (!user || user.passwordHash !== password) {
    // Also support fallback direct credentials check if not yet registered in seed users
    if (
      (role === 'librarian' || !role) &&
      username.toLowerCase() === 'lib2025' &&
      password === 'library@123'
    ) {
      const token = jwt.sign(
        { id: 'user-librarian', username: 'lib2025', name: 'Chief Librarian', role: 'librarian' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token,
        user: { id: 'user-librarian', username: 'lib2025', name: 'Chief Librarian', role: 'librarian' }
      });
    }

    if (
      (role === 'admin' || !role) &&
      username.toLowerCase() === 'admin2025' &&
      password === 'admin@punjab'
    ) {
      const token = jwt.sign(
        { id: 'user-admin', username: 'admin2025', name: 'Principal / Admin', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token,
        user: { id: 'user-admin', username: 'admin2025', name: 'Principal / Admin', role: 'admin' }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your username and password.' });
  }

  // If role filter requested, verify role matches
  if (role && user.role !== role) {
    return res.status(403).json({ success: false, message: `Access restricted. Your account is not registered as ${role}.` });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    token,
    user: { id: user.id, username: user.username, name: user.name, role: user.role, email: user.email }
  });
};

export const getMe = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  return res.json({ success: true, user: req.user });
};
