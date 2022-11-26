import { User } from './entities/user.entity';

export const mapUserToPresent = (
  user: User,
): Omit<User, 'password' | 'token'> => {
  const { id, username } = user;
  return { id, username };
};
