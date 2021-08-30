import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, EditUserDTO, UserRegistrationDTO } from './dtos';
import { Auth, User } from 'src/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';

@ApiTags('Users routes')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();
    return { data };
  }

  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDTO) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });
    return { message: 'User registered', data };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);
    return { data };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDTO) {
    const data = await this.userService.createOne(dto);
    return { message: 'User created', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDTO,
    @User() user: UserEntity,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      data = await this.userService.editOne(id, dto);
    } else {
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
    }
    return { message: 'User edited', data };
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      data = await this.userService.deleteOne(id);
    } else {
      data = await this.userService.deleteOne(id, user);
    }
    return { message: 'User deleted', data };
  }
}
