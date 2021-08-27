import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  deadline: Date;

  @IsBoolean()
  isDone: boolean;
}
