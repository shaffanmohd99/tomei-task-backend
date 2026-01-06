import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, UpdateTaskDto } from './task-dto';
import { error } from 'console';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  findAll(status?: TaskStatus) {
    return this.taskModel.findAll({
      where: status ? { status } : {},
      order: [['created_at', 'DESC']],
    });
  }

  async findOne(id: number) {
    const task = await this.taskModel.findByPk(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(data: CreateTaskDto) {
    return this.taskModel.create(data);
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    return task.update(dto);
  }

  async remove(id: number) {
    try {
      const task = await this.findOne(id);
      if (task.status !== TaskStatus.DONE) {
        await task.destroy();
      } else throw error('Task is not in status Done. Cannot be deleted');
    } catch (error) {}
  }
}
