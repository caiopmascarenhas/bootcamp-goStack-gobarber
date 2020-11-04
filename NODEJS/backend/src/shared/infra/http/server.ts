import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import express, {
  Request,
  Response,
  NextFunction
} from 'express';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middleware/rateLimiter';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter)

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
});

try {
  app.listen(3333, () => {
    console.log(`Servidor iniciado`)
  });

} catch {

  throw new AppError('Erro o iniciar o servidor', 500)

}

