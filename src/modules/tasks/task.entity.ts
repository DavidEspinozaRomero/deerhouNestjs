import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
