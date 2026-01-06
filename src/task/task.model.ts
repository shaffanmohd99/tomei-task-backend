import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column(DataType.STRING)
  description?: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.TODO,
  })
  declare status: CreationOptional<TaskStatus>;

  @CreatedAt
  declare created_at: CreationOptional<Date>;
}
