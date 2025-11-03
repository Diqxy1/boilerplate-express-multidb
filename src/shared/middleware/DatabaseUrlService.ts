interface DatabaseUrlConfig {
  prefix: string;
}

export class DatabaseUrl {
  private readonly prefix: string;

  constructor(config: DatabaseUrlConfig) {
    this.prefix = config.prefix;
  }

  getDatabaseUrl(): string {
    // postgres://username:password@host:port/database

    const username = `postgres`;
    const password = `123321`;
    const host = `localhost`;
    const port = `45432`;
    const database = `${this.prefix}_tenants`;

    return `postgres://${username}:${password}@${host}:${port}/${database}`;
  }

  getDatabase(): string {
    const database = `${this.prefix}_tenants`;

    return database;
  }
}
