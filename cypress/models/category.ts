import { faker } from '@faker-js/faker';

export type Category = {
  id: number;
  name: string;
};

export const createCategory = (category: Partial<Category> = {}) => {
  const id = faker.datatype.number();

  return {
    id,
    name: `${faker.lorem.word()}-${id}`,
    ...category,
  };
};
