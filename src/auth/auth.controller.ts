import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return user;
  }

  @Get('profile')
  profile() {
    return 'your todos';
  }
}
