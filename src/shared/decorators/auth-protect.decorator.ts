import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function AuthProtect() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
