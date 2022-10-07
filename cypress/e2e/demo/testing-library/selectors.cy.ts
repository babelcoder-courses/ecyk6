describe('Selectors', () => {
  it('selects elements correctly', () => {
    cy.visit('/cypress/selectors');
    cy.findByRole('button', { name: /outlined button \(#outlined\)/i }).should(
      'exist',
    );
    cy.findByText('Body (.text-group:nth-child(2))').should('exist');
    cy.findByTestId('subtitle').should('exist');
  });
});
