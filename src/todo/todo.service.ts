import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo)
      throw new NotFoundException('Todo does not exist or unauthorized');

    return todo;
  }

  async createOne({
    title,
    description,
    deadline,
  }: CreateTodoDTO): Promise<Todo> {
    const todo = this.todoRepository.create({
      title,
      description,
      deadline: new Date(deadline),
    });

    return await this.todoRepository.save(todo);
  }

  async editOne(id: number, dto: EditTodoDTO): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) throw new NotFoundException('Todo does not exist');

    const editedTodo = Object.assign(todo, dto);
    return await this.todoRepository.save(editedTodo);
  }

  async isDone(id: number) {
    await this.todoRepository
      .createQueryBuilder()
      .update('todos')
      .set({
        isDone: true,
        isDoneDate: 'now()',
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteOne(id: number) {
    return await this.todoRepository.delete(id);
  }
}
