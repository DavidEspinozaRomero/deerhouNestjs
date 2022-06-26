import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(taskFilter: GetTaskFilter): Promise<Task[]> {
    return this.tasksRepository.getTasks(taskFilter);
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.api.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`not found task whit id: ${id}`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.api.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`not found task whit id: ${id}`);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    let task: Task = await this.getTaskById(id);

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }
    await this.tasksRepository.api.save(task);
    return task;
  }

  //#region Basic
  // private tasks: Task[] = [
  //   {
  //     id: '5a76f403-fd4d-441f-a647-f44a1a3418e6',
  //     title: 'titulo',
  //     description: 'descripcion lorem sdfg',
  //     status: TaskStatus.OPEN,
  //   },
  // ];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWhitFilter(getTaskFilter: GetTaskFilter): Task[] {
  //   const { status, filter } = getTaskFilter;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (filter) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(filter) || task.description.includes(filter),
  //     );
  //   }

  //   return tasks;
  // }

  // getTasksById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`not found task whit id: ${id}`);
  //   }
  //   return found
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string) {
  //   const found = this.getTasksById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const { title, description, status } = updateTaskDto;
  //   let task: Task = this.getTasksById(id);

  //   if (title) {
  //     task.title = title;
  //   }
  //   if (description) {
  //     task.description = description;
  //   }
  //   if (status) {
  //     task.status = status;
  //   }
  //   return task;
  // }
  //#endregion Basic
}
