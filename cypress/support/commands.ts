import { RouteHandler } from 'cypress/types/net-stubbing';
import { User } from 'models/user';
import { faker } from '@faker-js/faker';
import { mockGetProfile } from 'api/auth';

export const getByTestID = (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`);
};

export const findByTestID = (
  subject: Cypress.PrevSubject,
  selector: string,
) => {
  return cy.wrap(subject).find(`[data-testid=${selector}]`);
};

export const getByTestIDStartsWith = (selector: string) => {
  return cy.get(`[data-testid^="${selector}"]`);
};

export const interceptApi = (
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  response?: RouteHandler,
) => {
  return cy.intercept(method, `${Cypress.env('apiUrl')}${path}`, response);
};

export const loginAs = (role: User['role']) => {
  localStorage.setItem('accessToken', faker.datatype.uuid());

  return mockGetProfile({ role }).mocked;
};

Cypress.Commands.add('getByTestID', getByTestID);

Cypress.Commands.add('getByTestIDStartsWith', getByTestIDStartsWith);

Cypress.Commands.add('findByTestID', { prevSubject: true }, findByTestID);

Cypress.Commands.add('interceptApi', interceptApi);

Cypress.Commands.add('loginAs', loginAs);
