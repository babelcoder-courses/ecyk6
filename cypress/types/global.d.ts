import {
  getByTestID,
  getByTestIDStartsWith,
  interceptApi,
  loginAs,
} from '../support/commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestID: typeof getByTestID;
      getByTestIDStartsWith: typeof getByTestIDStartsWith;
      findByTestID: (
        selector: string,
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      interceptApi: typeof interceptApi;
      loginAs: typeof loginAs;
    }
  }
}
