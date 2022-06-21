import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { title } from 'process';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(id:string): Task[] {
    if (!id) {
      return this.tasks;
    }
    
    return this.tasks.filter(task => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
