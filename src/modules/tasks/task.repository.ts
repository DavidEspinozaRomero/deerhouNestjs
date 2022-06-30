import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksRepository {
  constructor(private dataSource: DataSource) {}
  api = this.dataSource.getRepository(Task);

  async getTasks(taskFilter: GetTaskFilter): Promise<Task[]> {
    const { status, filter } = taskFilter;
    const query = this.api.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (filter) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:filter) OR LOWER(task.description) LIKE LOWER(:filter))',
        { filter: `%${filter}%` }, // %text% (includes, not perfect match)
      );
    }
    const tasks: Task[] = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.api.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });
    await this.api.save(task);
    return task;
  }
}
