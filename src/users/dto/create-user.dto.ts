export class CreateUserDto {
  username: string;
  password: string;
}

export class LoginUserDto extends CreateUserDto {}
