import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Privilege } from 'auth/enums/privilege.enum';

export const Privileges = (...privilege: Privilege[]) =>
  applyDecorators(SetMetadata('privileges', privilege));
