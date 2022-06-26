import { Injectable } from "@nestjs/common";
import { DataSource } from 'typeorm';

import { Task } from "./task.entity";

@Injectable()
export class TasksRepository {
  constructor(private dataSource: DataSource) {}
  api = this.dataSource.getRepository(Task);
  
}
