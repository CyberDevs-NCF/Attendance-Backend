import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  gbox: string;

  @IsString()
  password: string;
}
