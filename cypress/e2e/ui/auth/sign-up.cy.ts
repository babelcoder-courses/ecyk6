import { mockSignup } from 'api/auth';
import { createAuth } from 'models/auth';
import { itBehavesLikeFormValidation } from './shared';

describe('Signup UI', () => {
  itBehavesLikeFormValidation('/auth/sign-up');

  it('handles register process correctly', () => {
    const auth = createAuth();

    mockSignup(auth.email).mocked.as('signup');
    cy.visit('/');
    cy.getByTestID('auth-menu-login-button').click();
    cy.getByTestID('auth-form-alt-button').click();
    cy.location('pathname').should('eq', '/auth/sign-up');
    cy.getByTestID('auth-form-email').type(auth.email);
    cy.getByTestID('auth-form-password').type(auth.password);
    cy.getByTestID('auth-form-submit-button').click();
    cy.wait('@signup').its('request.body').should('deep.equal', auth);
    cy.getByTestID('flash-message').should(
      'have.text',
      'Your account has been created.',
    );
  });
});
