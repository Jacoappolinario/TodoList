import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  password: string;
}
