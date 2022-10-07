import { RouteHandler } from 'cypress/types/net-stubbing';

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

Cypress.Commands.add('getByTestID', getByTestID);

Cypress.Commands.add('getByTestIDStartsWith', getByTestIDStartsWith);

Cypress.Commands.add('findByTestID', { prevSubject: true }, findByTestID);

Cypress.Commands.add('interceptApi', interceptApi);
