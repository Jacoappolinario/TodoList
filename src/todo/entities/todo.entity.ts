import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  @ApiProperty()
  title: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  description: string;

  @Column({ type: 'timestamp' })
  @ApiProperty()
  deadline: Date;

  @Column({ type: 'bool', default: false })
  @ApiProperty()
  isDone: boolean;

  @Column({ type: 'timestamp' })
  @ApiProperty()
  isDoneDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;
}
