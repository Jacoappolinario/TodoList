import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dtos';
import { EditTodoDTO } from './dtos/edit-post.dto';

@Injectable()
export class TodoService {
  getMany() {
    return { ok: 'getMany' };
  }

  getOne(id: number) {
    return { ok: 'getOne' };
  }

  createOne(dto: CreateTodoDTO) {
    return { ok: 'createOne' };
  }

  editOne(id: number, dto: EditTodoDTO) {
    return { ok: 'editOne' };
  }

  deleteOne(d: number) {
    return { ok: 'deleteOne' };
  }
}
