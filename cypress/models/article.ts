import { faker } from '@faker-js/faker';

export type Article = {
  id: number;
  categoryId: number;
  userId: number;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const createArticle = (article: Partial<Article> = {}) => {
  return {
    id: faker.datatype.number(),
    categoryId: faker.datatype.number(),
    userId: faker.datatype.number(),
    title: faker.lorem.sentence(),
    excerpt: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    image: faker.image.imageUrl(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    ...article,
  };
};
