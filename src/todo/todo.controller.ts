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
import { CreateTodoDTO } from './dtos';
import { EditTodoDTO } from './dtos/edit-post.dto';

@Controller('todo')
export class TodoController {
  @Get()
  getMany() {
    return 'OK';
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'getOne',
    };
  }

  @Post()
  createOne(@Body() dto: CreateTodoDTO) {
    return dto;
  }

  @Put(':id')
  editOne(@Param('id') id: string, @Body() dto: EditTodoDTO) {
    return dto;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {}
}
