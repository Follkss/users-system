import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ENV } from '../env';

const database = ENV.DATABASE;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: database.host,
  port: Number(database.port),
  username: database.username,
  password: database.password,
  database: database.name,
  entities: [User],
  synchronize: true,
};
