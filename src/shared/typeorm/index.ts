import { DataSource, EntityManager } from 'typeorm';
import pgPromise from 'pg-promise';

import Tentans from '../../modules/tenants/typeorm/entities/tenants';
import { DatabaseUrl } from '@shared/middleware/DatabaseUrlService';

// Tenant Connection
const tenantDatabaseUrl = new DatabaseUrl({ prefix: 'diqxy' }).getDatabaseUrl();

export const postgres = new DataSource({
  type: 'postgres',
  url: tenantDatabaseUrl,
  entities: [Tentans],
  synchronize: true,
  logging: true,
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});

postgres
  .initialize()
  .then(() => {
    console.log('db connected');
  })
  .catch(async error => {
    if (error) {
      const pgp = pgPromise({});
      const db = pgp({
        host: 'localhost',
        port: 45432,
        user: 'postgres',
        password: '123321',
        database: 'postgres', // Banco de dados padrão do PostgreSQL
      });

      const getDatabase = new DatabaseUrl({ prefix: 'diqxy' }).getDatabase();

      const exists = await db.oneOrNone(
        'SELECT 1 FROM pg_database WHERE datname = $1',
        [tenantDatabaseUrl],
      );

      if (!exists) {
        await db.none(`CREATE DATABASE "${getDatabase}"`);
      }
    }
  });

export async function getTenantEntityManager(): Promise<EntityManager> {
  const db = postgres.createEntityManager();
  try {
    return db;
  } finally {
    postgres.destroy();
  }
}

export async function closeTenantConnection() {
  await postgres.destroy();
}

// Label Connection
export function getLabelConnection(labelDatabaseUrl: string): DataSource {
  return new DataSource({
    type: 'postgres',
    url: labelDatabaseUrl,
    entities: ['src/entities/**/*.ts'], // Adicione as entidades relevantes para o label
    synchronize: true, // Sincronizar com o banco de dados (apenas para ambiente de desenvolvimento)
    logging: true, // Ativar logs (pode ser ajustado conforme necessário)
  });
}

export async function getLabelEntityManager(
  labelDatabaseUrl: string,
): Promise<EntityManager> {
  const labelConnection = getLabelConnection(labelDatabaseUrl);
  return labelConnection.createEntityManager();
}

export async function closeLabelConnection(labelConnection: DataSource) {
  await labelConnection.destroy();
}

/* not initialize data source if migrations not run */
/* export const postgres = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 45432,
  username: 'postgres',
  password: '123321',
  database: 'tenants',
  entities: [Tentans, Users],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});

export const mongo = new DataSource({
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: 27017,
  entities: [Users],
}); */
