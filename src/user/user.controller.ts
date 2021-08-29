import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreateUserDTO, EditUserDTO } from './dtos';
import { UserService } from './user.service';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMany() {
    const users = await this.userService.getMany();
    return { users };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const user = await this.userService.getOne(id);
    return { user };
  }

  @Auth()
  @Post()
  async createOne(@Body() dto: CreateUserDTO) {
    const user = await this.userService.createOne(dto);
    return { message: 'User created', user };
  }
  @Auth()
  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EditUserDTO) {
    const user = await this.userService.editOne(id, dto);
    return { message: 'User edited', user };
  }
  @Auth()
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const user = await this.userService.deleteOne(id);
    return { message: 'User deleted', user };
  }
}
