import { faker } from '@faker-js/faker';
import { createUser, User } from 'models/user';

export const mockSignup = (email: string) => {
  const url = '/auth/sign-up';
  const response = {
    id: faker.datatype.number({ min: 1 }),
    email: email || faker.internet.email(),
  };

  return { url, response, mocked: cy.interceptApi('POST', url, response) };
};

export const mockSignin = () => {
  const url = '/auth/sign-in';
  const response = {
    code: 200,
    expire: faker.date.future(),
    token: faker.datatype.uuid(),
  };

  return {
    url,
    response,
    mocked: cy.interceptApi('POST', url, response),
  };
};

export const mockInvalidSignin = () => {
  const url = '/auth/sign-in';
  const response = {
    statusCode: 401,
    body: { error: 'incorrect Username or Password' },
  };

  return {
    url,
    response,
    mocked: cy.interceptApi('POST', url, response),
  };
};

export const mockGetProfile = (profile: Partial<User> = {}) => {
  const url = '/auth/profile';
  const user = createUser(profile);

  return {
    url,
    response: user,
    mocked: cy.interceptApi('GET', url, { user }),
  };
};
