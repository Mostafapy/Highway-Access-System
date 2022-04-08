import { IsNotEmpty, IsNumber } from 'class-validator';

export interface PageDescriptor {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  pagesCount: number;
  pageSize: number;
  total: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: PageDescriptor;
}

export class PaginationParams {
  @IsNumber()
  @IsNotEmpty()
  page = 1;

  @IsNumber()
  @IsNotEmpty()
  limit = 10;

  @IsNumber()
  @IsNotEmpty()
  skip = 0;
}
