import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { AuthRequest } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'college_library_secret_key_2025_secure';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const trimmedUsername = username.toLowerCase().trim();
    const user = await UserModel.findOne({ username: trimmedUsername });

    if (!user || user.passwordHash !== password) {
      // Fallback demo credentials check
      if (
        (role === 'librarian' || !role) &&
        (trimmedUsername === 'lib2025' || trimmedUsername === 'librarian') &&
        (password === 'library@123' || password === 'lib123')
      ) {
        const token = jwt.sign(
          { id: 'librarian-id', username: 'lib2025', name: 'Rashid Mahmood (Chief Librarian)', role: 'librarian' },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({
          success: true,
          token,
          user: { id: 'librarian-id', username: 'lib2025', name: 'Rashid Mahmood (Chief Librarian)', role: 'librarian' }
        });
      }

      if (
        (role === 'admin' || !role) &&
        (trimmedUsername === 'admin2025' || trimmedUsername === 'principal') &&
        (password === 'admin@punjab' || password === 'admin123')
      ) {
        const token = jwt.sign(
          { id: 'admin-id', username: 'admin2025', name: 'Prof. Dr. Tariq Bashir (Principal)', role: 'admin' },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({
          success: true,
          token,
          user: { id: 'admin-id', username: 'admin2025', name: 'Prof. Dr. Tariq Bashir (Principal)', role: 'admin' }
        });
      }

      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your username and password.' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ success: false, message: `Access restricted. Your account is not registered as ${role}.` });
    }

    const token = jwt.sign(
      { id: user.id || user._id, username: user.username, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: { id: user.id || user._id, username: user.username, name: user.name, role: user.role, email: user.email }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Login error' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  return res.json({ success: true, user: req.user });
};
