import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'nestuser',
  password: process.env.DATABASE_PASSWORD || 'nestpassword',
  database: process.env.DATABASE_NAME || 'nestdb',
  entities: [__dirname + '/dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/dist/migrations/*{.ts,.js}'],
  synchronize: false,
});
