import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksRepository {
  constructor(private dataSource: DataSource) {}
  api = this.dataSource.getRepository(Task);

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.api.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.api.save(task);
    return task;
  }
}
