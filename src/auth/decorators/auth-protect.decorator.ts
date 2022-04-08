import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Privileges } from './privilege.decorator';
import { Privilege } from 'auth/enums/privilege.enum';
import { PrivilegesGuard } from 'auth/guards/privilege.guard';

export function AuthProtect(...privilegesArr: Privilege[]) {
  return applyDecorators(
    Privileges(...privilegesArr),
    UseGuards(JwtAuthGuard, PrivilegesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
