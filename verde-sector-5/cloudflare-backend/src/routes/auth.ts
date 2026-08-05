import { Hono } from 'hono';
import { sign, verify } from 'jose';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const auth = new Hono();

// JWT configuration
const JWT_SECRET_KEY = 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';
const REFRESH_TOKEN_EXPIRY = '30d';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  phone: z.string().optional(),
  neighborhood: z.enum([
    'GIULESTI', 'CRANGASI', 'DRUMUL_TABEREI', 'FERENTARI',
    'RAHOVA', 'PROGRESUL', 'SEPTEMBRIE_13', 'MILITARI'
  ]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// Register endpoint
auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const prisma = c.get('prisma');
  const { email, password, name, phone, neighborhood } = c.req.valid('json');

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ error: 'User with this email already exists' }, 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone,
        neighborhood,
        role: 'CITIZEN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return c.json({
      user,
      accessToken,
      refreshToken,
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Failed to register user' }, 500);
  }
});

// Login endpoint
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const prisma = c.get('prisma');
  const { email, password } = c.req.valid('json');

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate tokens
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      neighborhood: user.neighborhood,
    };

    const accessToken = await generateAccessToken(userData);
    const refreshToken = await generateRefreshToken(userData);

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entityType: 'USER',
        entityId: user.id,
      },
    });

    return c.json({
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Failed to login' }, 500);
  }
});

// Refresh token endpoint
auth.post('/refresh', zValidator('json', refreshSchema), async (c) => {
  const { refreshToken } = c.req.valid('json');

  try {
    const payload = await verify(refreshToken, new TextEncoder().encode(JWT_SECRET_KEY));
    
    if (!payload || typeof payload === 'string') {
      return c.json({ error: 'Invalid refresh token' }, 401);
    }

    const prisma = c.get('prisma');
    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      neighborhood: user.neighborhood,
    };

    const newAccessToken = await generateAccessToken(userData);

    return c.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return c.json({ error: 'Invalid refresh token' }, 401);
  }
});

// Get current user endpoint
auth.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = await verify(token, new TextEncoder().encode(JWT_SECRET_KEY));
    
    if (!payload || typeof payload === 'string') {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const prisma = c.get('prisma');
    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        neighborhood: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Unauthorized' }, 401);
  }
});

// Logout endpoint
auth.post('/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = await verify(token, new TextEncoder().encode(JWT_SECRET_KEY));
      
      if (payload && typeof payload !== 'string') {
        const prisma = c.get('prisma');
        await prisma.auditLog.create({
          data: {
            userId: payload.sub as string,
            action: 'LOGOUT',
            entityType: 'USER',
          },
        });
      }
    }

    return c.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Failed to logout' }, 500);
  }
});

// Helper functions
async function generateAccessToken(user: any): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET_KEY);
  
  return await sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: JWT_EXPIRY }
  );
}

async function generateRefreshToken(user: any): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET_KEY);
  
  return await sign(
    {
      sub: user.id,
      type: 'refresh',
    },
    secret,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

// JWT middleware for protected routes
export const jwtMiddleware = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = await verify(token, new TextEncoder().encode(JWT_SECRET_KEY));
    
    if (!payload || typeof payload === 'string') {
      return c.json({ error: 'Invalid token' }, 401);
    }

    c.set('user', {
      id: payload.sub as string,
      email: (payload as any).email,
      role: (payload as any).role,
    });

    await next();
  } catch (error) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

// Role-based access control middleware
export const roleMiddleware = (...allowedRoles: string[]) => {
  return async (c: any, next: any) => {
    const user = c.get('user');
    
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    await next();
  };
};

export default auth;
