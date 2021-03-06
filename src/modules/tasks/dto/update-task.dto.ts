import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
