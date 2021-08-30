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
import { User, Auth } from 'src/common/decorators';
import { CreateTodoDTO, EditTodoDTO } from './dtos';
import { TodoService } from './todo.service';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { User as UserEntity } from 'src/user/entities';
import { AppResource } from 'src/app.roles';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoservice: TodoService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder,
  ) {}

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
    return this.todoservice.getById(id);
  }

  @Auth({
    resource: AppResource.TODO,
    action: 'create',
    possession: 'own',
  })
  @Post()
  async createOne(@Body() dto: CreateTodoDTO, @User() user: UserEntity) {
    const data = await this.todoservice.createOne(dto, user);
    return { message: 'Post created', data };
  }
  @Auth({
    resource: AppResource.TODO,
    action: 'update',
    possession: 'own',
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditTodoDTO,
    @User() user: UserEntity,
  ) {
    let data;

    if (this.roleBuilder.can(user.roles).updateAny(AppResource.TODO).granted) {
      data = await this.todoservice.editOne(id, dto);
    } else {
      data = await this.todoservice.editOne(id, dto, user);
    }

    return { message: 'Post edited', data };
  }

  @Auth()
  @Patch(':id/done')
  async isDone(@Param('id') id: number, @User() user: UserEntity) {
    await this.todoservice.isDone(id);

    return {
      isDone: 'True',
    };
  }
  @Auth({
    resource: AppResource.TODO,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;

    if (this.roleBuilder.can(user.roles).deleteAny(AppResource.TODO).granted) {
      data = await this.todoservice.deleteOne(id);
    } else {
      data = await this.todoservice.deleteOne(id, user);
    }
    return { message: 'Post deleted', data };
  }
}
