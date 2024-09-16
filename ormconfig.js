module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER || 'nestuser',
  password: process.env.DATABASE_PASSWORD || 'nestpassword',
  database: process.env.DATABASE_NAME || 'nestdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false, // Disable auto-sync in favor of migrations
};
