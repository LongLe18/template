import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { formatMessage } from 'devextreme/localization'; 
import { CommonConst } from '../constants/commom';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
  password?: string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

export const defaultUser: IUser = {
  email: 'admin@gmail.com',
  name: 'John Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
  password: 'password',
};

@Injectable()
export class AuthService {
  formatMessage = formatMessage;

  private _user: IUser | null = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = CommonConst.DEFAULT_PATH;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) { }

  async logIn(email: string, password: string) {
    try {
      // Send request
      if (email === defaultUser.email && password === defaultUser.password) {
        localStorage.setItem('user', JSON.stringify({ ...defaultUser, email }));
        this._user = { ...defaultUser, email };
        this.router.navigate([this._lastAuthenticatedPath]);
        return {
          isOk: true,
          data: this._user,
        };
      } else {
        return {
          isOk: false,
          message: formatMessage('message-auth'),
        }
      }
    } catch {
      return {
        isOk: false,
        message: formatMessage('message-auth'),
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || CommonConst.DEFAULT_PATH);

    if (!isLoggedIn) { 
      this.router.navigate([CommonConst.DEFAULT_PATH]);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || CommonConst.DASHBOARD;
    }
    
    return isLoggedIn || isAuthForm;
  }
}
