describe('Async Word List', () => {
  it('adds words correctly', () => {
    cy.visit('/cypress/async-word-list');
    cy.getByTestID('my-word-input').type('lorem');
    cy.getByTestID('add-word-button').click();
    cy.getByTestID('my-word-input').type('ipsum');
    cy.getByTestID('add-word-button').click();
    // cy.getByTestID('word-list-item-1').should('have.text', 'ipsum');
    // cy.getByTestID('word-list-item-2').should('have.text', 'lorem');

    cy.getByTestID('word-list').should(($list) => {
      const $words = $list.find('li');

      expect($words.first()).to.have.text('ipsum');
      expect($words.last()).to.have.text('lorem');
    });
  });
});
