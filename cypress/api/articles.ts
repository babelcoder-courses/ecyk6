import {
  ArticleDetails,
  createArticlesPagination,
} from '../models/article-details';
import * as queryString from 'query-string';
import { PagingOptions } from 'models/pagination';

const { _ } = Cypress;

export type FilterOptions = Partial<{
  term: string;
  categoryId: number;
  page: number;
}>;

export const mockGetArticles = (
  params: FilterOptions = {},
  paging?: PagingOptions,
  articlesDetailsList?: ArticleDetails[],
) => {
  const query = queryString.stringify(
    _.omit(params, params.page === 1 ? 'page' : ''),
  );
  const url = `/articles${query ? `?${query}` : ''}`;
  const response = createArticlesPagination(articlesDetailsList, paging);

  return { url, response, mocked: cy.interceptApi('GET', url, response) };
};
