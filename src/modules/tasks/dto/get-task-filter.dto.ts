import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTaskFilter {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
  @IsString()
  @IsOptional()
  filter: string;
}