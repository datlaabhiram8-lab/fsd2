import { Router } from 'express';
import { successResponse } from '../utils/apiResponse.js';

const router = Router();

router.get('/', (req, res) => {
  return successResponse(res, {
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Perfomatrix Core API',
    version: '1.0.0',
    workspaces: ['corporate', 'academic'],
  }, 'Perfomatrix API Health Check OK');
});

export default router;
