import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}