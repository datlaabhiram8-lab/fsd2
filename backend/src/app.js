
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { csrfSync } from 'csrf-sync';

import { ENV } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');

app.use(helmet());

app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
}));

// General API rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

// Server-side sessions stored in MongoDB
app.use(session({
  name: 'perfomatrix.sid',
  secret: ENV.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: ENV.MONGODB_URI,
    collectionName: 'user_sessions',
    ttl: 8 * 60 * 60,
  }),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    sameSite: 'lax',
    maxAge: ENV.SESSION_MAX_AGE_MS,
    path: '/',
  },
}));

// CSRF protection for state-changing API requests.
// GET / HEAD / OPTIONS are safe methods and are exempt.
const {
  generateToken,
  csrfSynchronisedProtection,
} = csrfSync({
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

app.use(ENV.API_PREFIX, csrfSynchronisedProtection);

// Expose a CSRF token to the frontend before login or other mutations.
// This route is registered in routes/index.js in the next step.
app.locals.generateCsrfToken = generateToken;

app.use(ENV.API_PREFIX, apiRoutes);

app.get('/', (req, res) => {
  res.json({
    project: 'Perfomatrix API',
    tagline: 'One Platform. Every Performance.',
    documentation: `${ENV.API_PREFIX}/docs`,
    health: `${ENV.API_PREFIX}/health`,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
