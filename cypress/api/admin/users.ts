import { PagingOptions } from 'models/pagination';
import { createUser, createUsersPagination, User } from 'models/user';
import * as queryString from 'query-string';

const { _ } = Cypress;

type FilterOptions = {
  term?: string;
};

export const mockGetAllUsers = (
  filterOptions?: FilterOptions,
  paging?: PagingOptions,
  users?: User[],
) => {
  const pagingWithDefaultValue = _.merge(
    { limit: 12, page: 1 },
    paging,
    filterOptions,
  );
  const query = queryString.stringify(pagingWithDefaultValue);
  const url = `/users${query ? `?${query}` : ``}`;
  const response = createUsersPagination(paging, users);

  return { url, response, mocked: cy.interceptApi('GET', url, response) };
};

export const mockGetUser = (id: number, model?: Partial<User>) => {
  const url = `/users/${id}`;
  const user = createUser({ id, ...model });

  return {
    url,
    response: user,
    mocked: cy.interceptApi('GET', url, { user }),
  };
};

export const mockUpdateUser = (id: number, model?: Partial<User>) => {
  const url = `/users/${id}`;
  const user = createUser({ id, ...model });

  return {
    url,
    response: user,
    mocked: cy.interceptApi('PATCH', url, { user }),
  };
};

export const mockDeleteUser = (id: number) => {
  const url = `/users/${id}`;
  const response = { statusCode: 204 };

  return {
    url,
    response,
    mocked: cy.interceptApi('DELETE', url, response),
  };
};
