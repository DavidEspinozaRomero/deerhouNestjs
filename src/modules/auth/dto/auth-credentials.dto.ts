import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const passwordRegExp = new RegExp(
  '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
);

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password is weak'})
  password: string;
}
