import bcrypt from 'bcrypt';
import { z } from 'zod';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Organization from '../models/Organization.js';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(254),
  password: z.string().min(1, 'Password is required').max(128),
  role: z.enum(['org_admin', 'client', 'team_member']).optional(),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100),
    email: z.string().trim().email('Please enter a valid email address').max(254),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128)
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    role: z.enum(['org_admin', 'client', 'team_member'], {
      errorMap: () => ({ message: 'Account type must be Organization, Client, or Team Member' }),
    }),
    organizationName: z.string().trim().max(120).optional(),
    organizationCode: z.string().trim().max(20).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const publicUser = (user, orgName = null) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  organizationId: user.organizationId ? user.organizationId.toString() : null,
  organizationName: orgName || user.organizationId?.name || null,
  title: user.title,
  avatarInitials:
    user.avatarInitials ||
    (user.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'U'),
});

export const getCsrfToken = (req, res) => {
  res.json({
    success: true,
    csrfToken: req.app.locals.generateCsrfToken(req),
  });
};

export const register = async (req, res, next) => {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0];
      return res.status(400).json({
        success: false,
        message: issue?.message || 'Invalid registration data.',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const {
      name,
      email: rawEmail,
      password,
      role,
      organizationName,
      organizationCode,
    } = parseResult.data;

    const email = rawEmail.toLowerCase();

    // 1. Verify email uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    let organizationId = null;
    let registeredOrg = null;

    // 2. Organization Creation or Code Validation
    if (role === 'org_admin') {
      const orgName = organizationName?.trim() || `${name}'s Organization`;
      // Generate clean code from org name
      const codeBase = orgName
        .replace(/[^A-Za-z0-9]/g, '')
        .toUpperCase()
        .slice(0, 6) || 'ORG';
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const code = `${codeBase}${randomSuffix}`;

      registeredOrg = await Organization.create({
        name: orgName,
        code,
      });
      organizationId = registeredOrg._id;
    } else {
      // Client or Team Member requires a valid organization code
      if (!organizationCode || !organizationCode.trim()) {
        return res.status(400).json({
          success: false,
          message: 'An organization code or invite code is required to join an existing workspace.',
        });
      }

      registeredOrg = await Organization.findOne({
        code: organizationCode.trim().toUpperCase(),
        isActive: true,
      });

      if (!registeredOrg) {
        return res.status(404).json({
          success: false,
          message: 'Invalid or inactive organization code. Please check with your administrator.',
        });
      }

      organizationId = registeredOrg._id;
    }

    // 3. Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    // 4. Create User document in MongoDB
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role,
      organizationId,
      isActive: true,
      avatarInitials: initials,
      title:
        role === 'org_admin'
          ? 'Organization Administrator'
          : role === 'client'
          ? 'Client Representative'
          : 'Team Member',
    });

    // If org_admin created the organization, set ownerId
    if (role === 'org_admin' && registeredOrg) {
      registeredOrg.ownerId = newUser._id;
      await registeredOrg.save();
    }

    // 5. Establish session
    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    req.session.userId = newUser._id.toString();

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      user: publicUser(newUser, registeredOrg.name),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid email and password.',
      });
    }

    const email = parsed.data.email.toLowerCase();
    const { password, role: requestedRole, rememberMe } = parsed.data;

    const user = await User.findOne({ email }).select('+passwordHash');
    const passwordMatches = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!user || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact your organization administrator.',
      });
    }

    // Validate requested role if provided
    if (requestedRole && user.role !== requestedRole) {
      const readableRole =
        requestedRole === 'org_admin'
          ? 'Organization'
          : requestedRole === 'client'
          ? 'Client'
          : 'Team Member';
      return res.status(403).json({
        success: false,
        message: `This account does not have ${readableRole} permissions. Please select your assigned workspace role.`,
      });
    }

    // Rotate session ID after authentication
    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    req.session.userId = user._id.toString();

    // If rememberMe requested, extend cookie maxAge (e.g., 30 days)
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    let orgName = null;
    if (user.organizationId) {
      const org = await Organization.findById(user.organizationId).lean();
      if (org) orgName = org.name;
    }

    return res.json({
      success: true,
      user: publicUser(user, orgName),
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    let orgName = null;
    if (req.user.organizationId) {
      const org = await Organization.findById(req.user.organizationId).lean();
      if (org) orgName = org.name;
    }

    res.json({
      success: true,
      user: publicUser(req.user, orgName),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    res.clearCookie('perfomatrix.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};
