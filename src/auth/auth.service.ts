import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    console.log(user);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  login() {}
}
