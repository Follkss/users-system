import { User } from './entities/user.entity';

export const mapUserToPresent = (
  user: User,
): Omit<User, 'password' | 'token'> & { createdAtStr: string } => {
  const { id, username, createdAt } = user;
  return { id, username, createdAt, createdAtStr: dateToStr(createdAt) };
};

export const dateToStr = (_date: Date) => {
  // make sure that accepts all date constructor types;
  const date = new Date(_date);

  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};
