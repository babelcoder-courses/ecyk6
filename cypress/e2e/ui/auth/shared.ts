export const itBehavesLikeFormValidation = (path: string) => {
  it('shows validation errors correctly', () => {
    const auth = { email: 'email', password: 'pass' };

    cy.visit(path);
    cy.getByTestID('auth-form-email').type(auth.email);
    cy.getByTestID('auth-form-password').type(auth.password);
    cy.getByTestID('auth-email-helper').should(
      'have.text',
      'email must be a valid email',
    );
    cy.getByTestID('auth-password-helper').should(
      'have.text',
      'password must be at least 8 characters',
    );
    cy.getByTestID('auth-form-submit-button').should('be.disabled');
  });
};
