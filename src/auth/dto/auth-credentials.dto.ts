import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentrialDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
