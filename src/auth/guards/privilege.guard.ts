import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PRIVILEGES_KEY = 'privileges';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const privileges = this.reflector.getAllAndOverride<string[]>(PRIVILEGES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!privileges || !privileges.length) return true;

    const user = context.switchToHttp().getRequest().user;

    if (!user) return false;

    let privilege: string;

    if (user.isAdmin) {
      privilege = 'ADMIN';
    } else {
      privilege = 'NORMAL_USER';
    }
    const hasPrivilege = () => privileges.includes(privilege);

    return user && hasPrivilege();
  }
}
