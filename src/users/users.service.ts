import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ username, password }: CreateUserDto) {
    const withSameUsername = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (withSameUsername) {
      throw new HttpException('Username already exists', 400);
    }

    const hashedPassword = await argon.hash(password);
    const token = v4();

    const user = await this.usersRepository.save(
      this.usersRepository.create({
        username,
        password: hashedPassword,
        token,
      }),
    );

    return {
      id: user.id,
      username: user.username,
      token,
    };
  }

  async login({ username, password }: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    const check = await argon.verify(user.password, password);

    if (!check) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findMe(token: string) {
    if (!token) throw new UnauthorizedException('Invalid credentials');

    const user = await this.usersRepository.findOne({
      where: {
        token,
      },
    });

    return user;
  }
}
