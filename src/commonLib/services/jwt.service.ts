import { Injectable } from "@angular/core";
import { LOCAL_STORAGE_KEY } from "src/commonLib/constants/enums";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string {
    return window.localStorage[LOCAL_STORAGE_KEY.ACCESS_TOKEN];
  }

  saveToken(token: string): void {
    window.localStorage[LOCAL_STORAGE_KEY.ACCESS_TOKEN] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  }
}
