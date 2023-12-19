import { LOCAL_STORAGE_KEY } from "../constants/enums";
import {jwtDecode} from "jwt-decode";

type PayLoadToken = {
  authorities: Array<string>;
  exp: number;
  iat: number;
  sub: string;
};

const getUser = (): string => {
  const username = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  return username ? username : "";
};

const getRoleAccount = (token?: any) => {
  const defaultValue = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || "";
  const decoded = jwtDecode<PayLoadToken>(token || defaultValue);
  return decoded.authorities;
};

const getUsernameFromToken = (token: any) => {
  const decodedToken = jwtDecode<PayLoadToken>(token);
  return decodedToken.sub;
};

const renderSTT = (page: any, limit: any, index: any) => {
  return (Number(page) - 1) * Number(limit) + index + 1;
};

const objectWithoutProperties = (obj: any, keys: string[]) => {
  let target: any = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};

const removeObjUndefined = (obj: any) => {
  if (obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === "" || obj[key] === null) {
        delete obj[key];
      }
    });
  }
  return obj;
};

export {
  getUser,
  renderSTT,
  objectWithoutProperties,
  removeObjUndefined,
  getRoleAccount,
  getUsernameFromToken,
};
