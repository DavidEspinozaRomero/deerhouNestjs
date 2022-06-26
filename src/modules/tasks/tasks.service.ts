import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository:TasksRepository) {}


  async getTaskByid(id: string): Promise<Task> {
    const found = await this.tasksRepository.api.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`not found task whit id: ${id}`);
    }
    return found
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
