import { faker } from '@faker-js/faker';
import { createPaging, PagingOptions } from './pagination';

const { _ } = Cypress;

export const Role = {
  Admin: 1,
  Editor: 2,
  Member: 3,
} as const;

export type RoleValue = typeof Role[keyof typeof Role];

export type User = {
  id: number;
  name: string;
  avatar: string;
  email?: string;
  role?: RoleValue;
};

export const createUser = (user: Partial<User> = {}) => {
  return {
    id: faker.datatype.number(),
    name: faker.name.fullName(),
    avatar: faker.image.imageUrl(),
    role: faker.helpers.arrayElement(Object.values(Role)),
    email: faker.internet.email(),
    ...user,
  };
};

export const createUserList = (count?: number, fields: Partial<User> = {}) => {
  const length = count || faker.datatype.number({ min: 5, max: 10 });

  return _.times(length, () => createUser(fields));
};

export const createUsersPagination = (
  pagingOptions: PagingOptions = {},
  users?: User[],
) => {
  return {
    users: {
      items: users || createUserList(pagingOptions?.limit),
      paging: createPaging(pagingOptions),
    },
  };
};
