import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, UpdateTaskDto } from './task-dto';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  getAll(@Query('status') status?: TaskStatus) {
    return this.service.findAll(status);
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
