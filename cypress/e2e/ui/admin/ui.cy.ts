import { Role } from 'models/user';

describe('Admin UI', () => {
  beforeEach(() => {
    cy.interceptApi('GET', '/dashboard', {});
    cy.loginAs(Role.Admin);
    cy.visit('/admin');
  });

  it('redirects to /admin/dashboard correctly', () => {
    cy.location('pathname').should('eq', '/admin/dashboard');
  });

  it('navigates to each pages correctly', () => {
    cy.getByTestID('admin-links').within(() => {
      const linkNames = ['users', 'categories', 'articles', 'dashboard'];

      for (const linkName of linkNames) {
        cy.get(`a[href="/admin/${linkName}"]`)
          .click()
          .location('pathname')
          .should('eq', `/admin/${linkName}`);
      }
    });
  });
});
