import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { add } from 'date-fns';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserToPresent } from './helpers';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    res.cookie('token', user.token, {
      expires: add(new Date(), {
        days: 1,
      }),
    });

    return res.send(user);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.login(createUserDto);

    res.cookie('token', user.token, {
      expires: add(new Date(), {
        days: 1,
      }),
    });

    return res.send(user);
  }

  @Get('me')
  findOne(@Req() req: Request) {
    const token = req.cookies.token;

    return this.usersService.findMe(token);
  }

  @Get()
  async users() {
    return (await this.usersService.findAll()).map(mapUserToPresent);
  }
}
