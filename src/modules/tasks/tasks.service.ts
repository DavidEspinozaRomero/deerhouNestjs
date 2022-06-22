import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilter } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '5a76f403-fd4d-441f-a647-f44a1a3418e6',
      title: 'titulo',
      description: 'descripcion lorem sdfg',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWhitFilter(getTaskFilter: GetTaskFilter): Task[] {
    const { status, filter } = getTaskFilter;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (filter) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(filter) || task.description.includes(filter),
      );
    }

    return tasks;
  }

  getTasksById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, createTaskDto: CreateTaskDto): Task {
    const { title, description, status } = createTaskDto;
    let task: Task = this.getTasksById(id);

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }
    return task;
  }
}
