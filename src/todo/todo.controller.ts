import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoDTO, EditTodoDTO } from './dtos';
import { TodoService } from './todo.service';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoservice: TodoService) {}

  @Get()
  async getMany() {
    const todo = await this.todoservice.getMany();
    return {
      message: 'Correct Request',
      todo,
    };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoservice.getOne(id);
  }

  @Post()
  createOne(@Body() dto: CreateTodoDTO) {
    return this.todoservice.createOne(dto);
  }

  @Put(':id')
  editOne(@Param('id') id: number, @Body() dto: EditTodoDTO) {
    return this.todoservice.editOne(id, dto);
  }

  @Patch(':id/done')
  async isDone(@Param('id') id: number) {
    await this.todoservice.isDone(id);

    return {
      isDone: 'True',
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.todoservice.deleteOne(id);
  }
}
