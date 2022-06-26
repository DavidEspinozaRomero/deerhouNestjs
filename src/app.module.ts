import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './modules/tasks/tasks.module';
// import { Task } from './modules/tasks/task.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TasksModule, 
    TypeOrmModule.forRoot({
        host: 'localhost',
        database: 'task-management',
        username: 'postgres',
        port: 5432,
        password: 'postgres',
        type: 'postgres',
        // entities: [Task],
        autoLoadEntities: true,
        synchronize: true,
      }), AuthModule,
  ],
})
export class AppModule {}
