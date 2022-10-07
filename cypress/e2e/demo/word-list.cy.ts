const { _ } = Cypress;

describe('Word List', () => {
  beforeEach(() => {
    cy.visit('/cypress/word-list');
  });

  it('adds words correctly', () => {
    const wordList = [
      'short-word',
      'medium-medium-word',
      'very-long-long-word',
    ];

    for (const word of wordList) {
      cy.getByTestID('my-word-input').type(word);
      cy.getByTestID('add-word-button').click();
    }

    for (const [index, word] of wordList.reverse().entries()) {
      cy.get(`[data-testid="word-list-item-${index + 1}"]`).should(
        'have.text',
        _.truncate(word, { length: 15 }),
      );
    }
  });

  describe('Validation', () => {
    it('does not allow empty input', () => {
      cy.getByTestID('my-word-input').type(' ');
      cy.getByTestID('add-word-button').click();
      cy.getByTestID('word-input-error').should(
        'have.text',
        'empty input is not allowed',
      );
    });

    it('does not allow duplication', () => {
      const word = 'my-word';

      cy.getByTestID('my-word-input').type(word);
      cy.getByTestID('add-word-button').click();
      cy.getByTestID('my-word-input').type(word);
      cy.getByTestID('add-word-button').click();
      cy.getByTestID('word-input-error').should(
        'have.text',
        'has already included the word',
      );
    });
  });
});

export {};
