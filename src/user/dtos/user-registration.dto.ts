import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

export class UserRegistrationDTO extends OmitType(CreateUserDTO, [
  'roles',
] as const) {}
