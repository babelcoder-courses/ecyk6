import { faker } from '@faker-js/faker';

describe('Post Form Data', () => {
  it('handles form input correctly', () => {
    cy.visit('/cypress/post-form-data');

    const newPost = {
      title: faker.lorem.sentence(),
      category: faker.helpers.arrayElement(['java', 'python', 'ruby']),
      status: faker.helpers.arrayElement(['drafted', 'published']),
      content: faker.lorem.paragraph(),
    };

    cy.interceptApi('POST', '/posts').as('createPost');

    cy.getByTestID('upload-input').attachFile('demo/image.png');
    cy.getByTestID('post-form-title').type(newPost.title);
    cy.getByTestID('post-form-category').select(newPost.category);
    cy.getByTestID(`post-form-${newPost.status}-status`).check();
    cy.getByTestID('post-form-content').type(newPost.content);
    cy.getByTestID('post-form-submit-button').click();

    cy.wait('@createPost').interceptFormData((formData) => {
      expect(formData.title).to.eq(newPost.title);
      expect(formData.category).to.eq(newPost.category);
      expect(formData.status).to.eq(newPost.status);
      expect(formData.content).to.eq(newPost.content);
      expect(formData.image).to.eq('image.png');
    });
  });
});
