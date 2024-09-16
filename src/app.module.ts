import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Employee } from './data-access/employee/employee.entity';
import { Cafe } from './data-access/cafe/cafe.entity';
import { EmployeeController } from './api/employee/employee.controller';
import { CafeController } from './api/cafe/cafe.controller';
import { CafeService } from './api/cafe/cafe.service';
import { EmployeeService } from './api/employee/employee.service';
import { CafeDatabaseService } from './data-access/cafe/cafe.database.service';
import { EmployeeDatabaseService } from './data-access/employee/employee.database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables available globally
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false, // We will use migrations
    }),
    TypeOrmModule.forFeature([Employee, Cafe]),
  ],
  controllers: [AppController, EmployeeController, CafeController],
  providers: [
    AppService,
    EmployeeService,
    CafeService,
    CafeDatabaseService,
    EmployeeDatabaseService,
  ],
})
export class AppModule {}
