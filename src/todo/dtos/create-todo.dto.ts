import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsDateString()
  @ApiProperty()
  deadline: Date;

  isDone?: boolean;

  isDoneDate?: Date;
}
