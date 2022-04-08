import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PaginationParams } from '../types/pagination.type';

export const Pagination = createParamDecorator(
  (data: string, ctx: ExecutionContext): PaginationParams | number => {
    const request: Request = ctx.switchToHttp().getRequest();
    const page = Math.max(1, parseInt(request.query.page as string, 10) || 1);
    const limit =
      parseInt(request.query.limit as string, 10) ||
      parseInt(process.env.PAGINATION_DEFAULT_PAGE_SIZE, 10) ||
      10;
    const pagination: PaginationParams = {
      page,
      limit,
      skip: (page - 1) * limit,
    };
    return data ? pagination[data] : pagination;
  },
);
