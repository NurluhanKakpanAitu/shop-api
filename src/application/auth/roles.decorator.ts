import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../domain/users/user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
