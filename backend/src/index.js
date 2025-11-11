import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import yaml from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


import routes from './routes/index.js';
import { testConnection } from './config/db.js';

export async function start() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const swaggerPath = path.join(__dirname, 'docs', 'openapi.yaml');
    const swaggerDoc = yaml.load(swaggerPath);
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } catch (e) {
    console.warn('Swagger no cargado:', e?.message);
  }

  app.use('/api', routes);
  app.get('/health', (_req, res) => res.json({ ok: true }));

  await testConnection();

  return app;
}






