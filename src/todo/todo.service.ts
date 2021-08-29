import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateTodoDTO, EditTodoDTO } from './dtos';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getMany(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getById(id: number, user?: User) {
    const todo = await this.todoRepository
      .findOne(id)
      .then((t) => (!user ? t : !!t && user.id === t.user.id ? t : null));
    if (!todo)
      throw new NotFoundException('Todo does not exist or unauthorized');
    return todo;
  }

  async createOne(dto: CreateTodoDTO, user: User) {
    const data = {
      title: dto.title,
      description: dto.description,
      deadline: new Date(dto.deadline),
      user,
    };

    const todo = this.todoRepository.create(data);

    return await this.todoRepository.save(todo);
  }

  async editOne(id: number, dto: EditTodoDTO, user?: User) {
    const todo = await this.getById(id, user);
    const editedTodo = Object.assign(todo, dto);
    return await this.todoRepository.save(editedTodo);
  }

  async isDone(id: number, user?: User) {
    await this.todoRepository
      .createQueryBuilder()
      .update('todos')
      .set({
        isDone: true,
        isDoneDate: 'now()',
      })
      .where('user = :user', { user: user })
      .execute();
  }

  async deleteOne(id: number, user?: User) {
    const todo = await this.getById(id, user);
    return await this.todoRepository.remove(todo);
  }
}
