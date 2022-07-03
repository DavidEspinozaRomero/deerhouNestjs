import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() getTaskFilter: GetTaskFilter,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(getTaskFilter, user);
  }
  @Get(':id')
  getTasksById(@Param() { id }, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTasksTasks(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param() { id }, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
  @Patch(':id')
  updateTask(
    @Param() { id },
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, user);
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
