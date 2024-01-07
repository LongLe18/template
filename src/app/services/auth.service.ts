import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { formatMessage } from 'devextreme/localization';
import { CommonConst } from '../constants/common';
import { LOCAL_STORAGE_KEY } from "../constants/enums";
import { IUser } from '../constants/types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface LoginData {
  username: string;
  password: string;
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

  private _user: IUser | null = localStorage.getItem(LOCAL_STORAGE_KEY.USER) ?
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER)) : null;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = CommonConst.DEFAULT_PATH;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(email: string, password: string) {
    try {
      const data: LoginData = {"username": email, "password": password};
      // Send request
      // const response = await this.http.post(`${environment.apiUrl}/authentication/api/v1/login`, data).toPromise();
      // Kiểm tra nếu đăng nhập thành công
      // if (response['isOk']) {
      if (email === defaultUser.email && password === defaultUser.password) {
        localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify({ ...defaultUser, email })); // replace defaulUser -> response
        this._user = { ...defaultUser, email };  // replace defaulUser -> response
        this.router.navigate([this._lastAuthenticatedPath]);

        return {
          isOk: true,
          data: this._user,
        };
      } else {
        // Xử lý trường hợp đăng nhập không thành công từ server
        return {
          isOk: false,
          message: formatMessage('message-auth'),
        };
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

      this.router.navigate([CommonConst.SIGNUP]);
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
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER);
    this.router.navigate([CommonConst.DEFAULT_PATH]);
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
