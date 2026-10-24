
import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(
        `[Perfomatrix API] Server listening on port ${ENV.PORT} (${ENV.NODE_ENV})`
      );
      console.log(
        `[Perfomatrix API] Health endpoint at http://localhost:${ENV.PORT}${ENV.API_PREFIX}/health`
      );
    });
  } catch (error) {
    console.error('[Perfomatrix API] Startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
