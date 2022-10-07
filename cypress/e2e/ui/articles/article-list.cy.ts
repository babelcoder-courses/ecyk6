import { FilterOptions, mockGetArticles } from 'api/articles';
import {
  ArticleDetails,
  createArticleDetailsList,
} from 'models/article-details';

import { faker } from '@faker-js/faker';
import { mockGetCategories } from 'api/categories';
import { PagingOptions } from 'models/pagination';

const renderArticleListPage = (
  params?: FilterOptions,
  paging?: PagingOptions,
) => {
  const {
    response: {
      articles: { items: articles },
    },
  } = mockGetArticles(params, paging);
  mockGetCategories();
  cy.visit('/articles');

  return articles;
};

const checkArticleList = (articles: ArticleDetails[]) => {
  cy.getByTestID('article-item').each(($element, index) => {
    const { title, image, excerpt, user, category } = articles[index];

    cy.wrap($element).within(() => {
      cy.getByTestID('article-item-title').contains(title);
      cy.getByTestID('article-item-image').should(
        'have.css',
        'background-image',
        `url("${image}")`,
      );
      cy.getByTestID('article-item-excerpt').contains(excerpt);
      cy.getByTestID('article-item-user-name').contains(user.name);
      cy.getByTestID('article-item-user-avatar').should(
        'have.attr',
        'src',
        user.avatar,
      );
      cy.getByTestID('article-item-category-name').contains(category.name);
    });
  });
};

describe('Article List UI', () => {
  it('renders article list correctly', () => {
    const articles = renderArticleListPage();
    cy.get('h1').contains('Articles');
    checkArticleList(articles);
  });

  it('renders article list with search query correctly', () => {
    const term = faker.lorem.word();
    const expectedArticleList = createArticleDetailsList(undefined, {
      title: `${faker.lorem.word()} ${term} ${faker.lorem.word()}`,
    });
    mockGetArticles({ term }, undefined, expectedArticleList).mocked.as(
      'loadArticlesWithQuery',
    );
    renderArticleListPage();
    cy.getByTestID('articlie-list-search-input').type(term);
    cy.wait('@loadArticlesWithQuery');
    checkArticleList(expectedArticleList);
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/articles');
      expect(location.search).to.eq(`?term=${term}`);
    });
  });

  it('handles pagination correctly', () => {
    const totalPages = faker.datatype.number({ min: 3, max: 5 });

    renderArticleListPage(undefined, { totalPages });
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/articles');
      expect(location.search).to.eq('');
    });
    cy.getByTestID('article-list-pagination').within(() => {
      cy.get('li:first-child > button').should('be.disabled');
    });

    for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
      mockGetArticles({ page: currentPage }, { page: currentPage, totalPages });
      cy.getByTestID('article-list-pagination').contains(currentPage).click();
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/articles');
        expect(location.search).to.eq(`?page=${currentPage}`);
      });
      cy.getByTestID('article-list-pagination').within(() => {
        cy.get(`li:nth-child(${currentPage + 1}) > button`).should(
          'have.attr',
          'aria-current',
          'true',
        );
      });

      if (currentPage === totalPages) {
        cy.get('li:last-child > button').should('be.disabled');
      }
    }
  });
});
