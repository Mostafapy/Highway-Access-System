import { applyDecorators, SetMetadata } from '@nestjs/common';

export const Privilege = (...privilege: string[]) =>
  applyDecorators(SetMetadata('privilege', privilege));
