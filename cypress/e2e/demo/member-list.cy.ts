describe('Member List', () => {
  it('renders member list correctly', () => {
    const members = ['Sathit', 'Sombut', 'Somchai', 'Somprasong', 'Sornthep'];

    cy.visit('/cypress/member-list');
    cy.get('[data-testid="member-item"]').each(($element, index) => {
      const member = members[index];

      cy.wrap($element).within(() => {
        cy.get('[data-testid="member-name"]').should('have.text', member);
        cy.get('[data-testid="member-avatar"]')
          .should('have.attr', 'alt', member)
          .and('have.attr', 'src')
          .and('include', member.toLowerCase());
      });
    });
  });
});
