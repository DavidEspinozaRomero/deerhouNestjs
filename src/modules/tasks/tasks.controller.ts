import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getAllTasks(@Param() {id}): Task[] {
    console.log(id);
    return this.tasksService.getAllTasks(id);
  }
  
  @Post()
  createTasksTasks(@Body() createTaskDto:CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

}
