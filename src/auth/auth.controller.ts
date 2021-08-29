import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Success Login',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'your todos';
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refreshToken(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Success Refresh Token',
      data,
    };
  }
}
