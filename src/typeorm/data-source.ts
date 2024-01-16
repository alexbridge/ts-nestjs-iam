import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGS === 'true',
  synchronize: false,
  migrationsTableName: 'migration',
  entities: [join(__dirname, '..', 'modules', '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'data', 'migrations', '*.{ts,js}')],
};

export default new DataSource(dataSourceOptions);
