import { CanActivateFn } from '@angular/router';
import { isUserToken } from '../../utils/jwt.helper';

export const authGuard: CanActivateFn = (route, state) => {
  return isUserToken()
};
