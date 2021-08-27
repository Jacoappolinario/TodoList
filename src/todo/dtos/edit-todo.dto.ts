import { CreateTodoDTO } from './create-todo.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditTodoDTO extends PartialType(CreateTodoDTO) {}
