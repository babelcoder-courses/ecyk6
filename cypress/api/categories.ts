import { faker } from '@faker-js/faker';
import { createCategory } from '../models/category';

const { _ } = Cypress;

export const mockGetCategories = () => {
  const url = '/categories';
  const count = faker.datatype.number({ min: 3, max: 5 });
  const categories = _.times(count, () => createCategory());

  return {
    url,
    response: categories,
    mocked: cy.interceptApi('GET', url, categories),
  };
};
