import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'bool', default: false })
  isDone: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
