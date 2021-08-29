import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
@ApiTags('Auth Routes')
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

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Correct Request',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  async refreshToken(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Success Refresh Token',
      data,
    };
  }
}
