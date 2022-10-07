import { faker } from '@faker-js/faker';

export type Auth = {
  email: string;
  password: string;
};

export const createAuth = (auth: Partial<Auth> = {}) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...auth,
  };
};
