import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Privilege } from './privilege.decorator';

export function AuthProtect(...privileges: string[]) {
  return applyDecorators(
    Privilege(...privileges),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
