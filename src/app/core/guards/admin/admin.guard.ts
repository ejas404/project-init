import { CanActivateFn } from '@angular/router';
import { isAdminToken } from '../../utils/jwt.helper';

export const adminGuard: CanActivateFn = (route, state) => {
  return isAdminToken()
};
