import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dtos';
import { EditTodoDTO } from './dtos/edit-post.dto';
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

  async getOne(id: number) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo)
      throw new NotFoundException('Todo does not exist or unauthorized');

    return todo;
  }

  async createOne(dto: CreateTodoDTO) {
    const todo = this.todoRepository.create(dto as any);
    return await this.todoRepository.save(todo);
  }

  async editOne(id: number, dto: EditTodoDTO) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) throw new NotFoundException('Todo does not exist');

    const editedTodo = Object.assign(todo, dto);
    return await this.todoRepository.save(editedTodo);
  }

  async deleteOne(id: number) {
    return await this.todoRepository.delete(id);
  }
}
