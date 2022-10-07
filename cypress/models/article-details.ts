import { Article, createArticle } from './article';
import { Category, createCategory } from './category';
import { createUser, User } from './user';
import { createPaging, PagingOptions } from './pagination';
import { faker } from '@faker-js/faker';

const { _ } = Cypress;

export type ArticleDetails = Article & {
  user: User;
  category: Category;
};

export const createArticleDetails = (
  articleDetails: Partial<ArticleDetails> = {},
) => {
  const { user, category, ...article } = articleDetails;

  return {
    ...createArticle(article),
    user: createUser(user),
    category: createCategory(category),
  };
};

export const createArticleDetailsList = (
  count?: number,
  fields: Partial<ArticleDetails> = {},
) => {
  const length = count || faker.datatype.number({ min: 5, max: 10 });

  return _.times(length, () => createArticleDetails(fields));
};

export const createArticlesPagination = (
  articleDetailsList?: ArticleDetails[],
  pagingOptions?: PagingOptions,
) => {
  return {
    articles: {
      items:
        articleDetailsList || createArticleDetailsList(pagingOptions?.limit),
      paging: createPaging(pagingOptions),
    },
  };
};
