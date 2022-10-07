import { faker } from '@faker-js/faker';

export type PagingOptions = Partial<{
  limit: number;
  page: number;
  totalPages: number;
}>;

export const createPaging = (options: PagingOptions = {}) => {
  const {
    page = 1,
    limit = faker.datatype.number({ min: 5, max: 10 }),
    totalPages = faker.datatype.number({ min: 3, max: 5 }),
  } = options;

  return {
    count: limit * totalPages,
    limit,
    nextPage: page + 1,
    page,
    prevPage: page - 1,
    totalPages,
  };
};
