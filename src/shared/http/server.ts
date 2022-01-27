import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

import AppErro from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppErro) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Server started in port ${process.env.PORT}`);
});
