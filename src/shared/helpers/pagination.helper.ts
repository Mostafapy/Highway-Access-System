import { PageDescriptor, PaginationParams } from '../types/pagination.type';

export const getPageDescriptor = (
  pagination: PaginationParams,
  recordsCount: number,
): PageDescriptor => {
  const pagesCount: number = Math.ceil(recordsCount / pagination.limit);
  //current page index rebase to 1
  if (pagination.page === 0) {
    pagination.page = 1;
  }

  return {
    currentPage: pagination.page,
    nextPage: pagesCount > pagination.page ? pagination.page + 1 : null,
    prevPage: 1 < pagination.page ? pagination.page - 1 : null,
    pageSize: pagination.limit,
    pagesCount,
    total: recordsCount,
  };
};
