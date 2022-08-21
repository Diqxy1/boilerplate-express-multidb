import { DataSource } from 'typeorm';

import Users from '@modules/users/typeorm/Users';
import Tentans from '../../modules/tenants/typeorm/entities/tenants';

/* not initialize data source if migrations not run */
export const postgres = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 45432,
  username: 'postgres',
  password: '123321',
  database: 'tenants',
  entities: [Tentans],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});

export const mongo = new DataSource({
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: 27017,
  entities: [Users],
});
