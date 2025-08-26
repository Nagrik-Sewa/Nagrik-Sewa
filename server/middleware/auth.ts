import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
    issuer: 'nagrik-sewa',
    audience: 'nagrik-sewa-users'
  });
};

export const generateRefreshToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '30d',
    issuer: 'nagrik-sewa',
    audience: 'nagrik-sewa-refresh'
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (error) {
    return null;
  }
};

// Authentication middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Access token required'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
      return;
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Account is blocked'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (decoded) {
      const user = await User.findById(decoded.userId).select('-password');
      if (user && user.isActive && !user.isBlocked) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication if optional
    next();
  }
};

// Rate limiting for authentication attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: Date }>();

export const rateLimitAuth = (req: Request, res: Response, next: NextFunction): void => {
  const identifier = req.ip || 'unknown';
  const now = new Date();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const attempts = loginAttempts.get(identifier);

  if (attempts) {
    // Reset if window has passed
    if (now.getTime() - attempts.lastAttempt.getTime() > windowMs) {
      loginAttempts.delete(identifier);
    } else if (attempts.count >= maxAttempts) {
      res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.',
        retryAfter: Math.ceil((windowMs - (now.getTime() - attempts.lastAttempt.getTime())) / 1000)
      });
      return;
    }
  }

  next();
};

export const recordLoginAttempt = (identifier: string, success: boolean): void => {
  if (success) {
    loginAttempts.delete(identifier);
  } else {
    const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: new Date() };
    attempts.count += 1;
    attempts.lastAttempt = new Date();
    loginAttempts.set(identifier, attempts);
  }
};
