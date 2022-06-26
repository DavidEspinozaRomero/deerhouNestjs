import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTaskFilter: GetTaskFilter): Promise<Task[]> {
    // if (Object.keys(getTaskFilter).length) {
    //   return this.tasksService.getTasksWhitFilter(getTaskFilter);
    // }
    return this.tasksService.getAllTasks();
  }
  @Get(':id')
  getTasksById(@Param() { id }): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTasksTasks(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  // #region Basic
  // @Get()
  // getTasks(@Query() getTaskFilter: GetTaskFilter): Task[] {
  //   if (Object.keys(getTaskFilter).length) {
  //     return this.tasksService.getTasksWhitFilter(getTaskFilter);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get(':id')
  // getTasksById(@Param() { id }): Task {
  //   return this.tasksService.getTasksById(id);
  // }

  // @Post()
  // createTasksTasks(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete(':id')
  // deleteTask(@Param() { id }) {
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch(':id')
  // updateTask(@Param() { id }, @Body() updateTaskDto: UpdateTaskDto): Task {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
  // #endregion Basic
}
