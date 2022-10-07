import { faker } from '@faker-js/faker';

describe('Post Form', () => {
  beforeEach(() => {
    cy.visit('/cypress/post-form');
  });

  it('handles form input correctly', () => {
    const newPost = {
      title: faker.lorem.sentence(),
      category: faker.helpers.arrayElement(['java', 'python', 'ruby']),
      status: faker.helpers.arrayElement(['drafted', 'published']),
      content: faker.lorem.paragraph(),
    };

    cy.interceptApi('POST', '/posts').as('createPost');

    cy.getByTestID('post-form-title').type(newPost.title);
    cy.getByTestID('post-form-category').select(newPost.category);
    cy.getByTestID(`post-form-${newPost.status}-status`).check();
    cy.getByTestID('post-form-content').type(newPost.content);
    // cy.getByTestID('post-form-submit-button').click();

    // cy.wait('@createPost').then((interception) => {
    //   expect(interception.request.body).to.deep.eq(newPost);
    // });
  });

  it('handles validation correctly', () => {
    cy.getByTestID('post-form-title').type('title').clear().blur();
    cy.getByTestID('post-form-content').type('content').clear().blur();

    cy.getByTestID('post-form-title-helper').should(
      'have.text',
      'title is a required field',
    );
    cy.getByTestID('post-form-content-helper').should(
      'have.text',
      'content is a required field',
    );
    cy.getByTestID('post-form-submit-button').should('be.disabled');
  });
});
