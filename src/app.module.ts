import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './modules/tasks/tasks.module';
// import { Task } from './modules/tasks/task.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: ConfigValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          host: configService.get('DB_HOST'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          port: configService.get('DB_PORT'),
          password: configService.get('DB_PASSWORD'),
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    // forRoot({
    //   host: 'localhost',
    //   database: 'task-management',
    //   username: 'postgres',
    //   port: 5432,
    //   password: 'postgres',
    //   type: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   // entities: [Task],
    // }),
    AuthModule,
  ],
})
export class AppModule {}
