import { CreateTodoDTO } from './create-todo.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class EditTodoDTO extends PartialType(
  OmitType(CreateTodoDTO, ['title'] as const),
) {}
