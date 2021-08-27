import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoDTO } from './dtos';
import { EditTodoDTO } from './dtos/edit-post.dto';
import { TodoService } from './todo.service';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoservice: TodoService) {}

  @Get()
  async getMany() {
    const data = await this.todoservice.getMany();
    return {
      message: 'Correct Request',
      data,
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

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.todoservice.deleteOne(id);
  }
}
