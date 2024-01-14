// Package
import JSCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const SIGN_UP = '[SESSION] SIGNUP';
export const LOG_IN = '[SESSION] LOGIN';
export const LOGOUT = '[SESSION] LOGOUT';
export const REFRESH = '[SESSION] REFRESH';

export const signUpAction = (accessToken: string, refreshToken: string) => {
  JSCookie.set('access', accessToken);
  JSCookie.set('refresh', refreshToken);

  const decodedToken = jwtDecode(accessToken);
  return {
    type: SIGN_UP,
    payload: decodedToken
  }
};

export const logInAction = (accessToken: string, refreshToken: string) => {
  JSCookie.set('access', accessToken);
  JSCookie.set('refresh', refreshToken);

  const decodedToken = jwtDecode(accessToken);
  return {
    type: LOG_IN,
    payload: decodedToken
  }
};

export const refreshAction = (accessToken: string, refreshToken: string) => {
  JSCookie.set('access', accessToken);
  JSCookie.set('refresh', refreshToken);

  const decodedToken = jwtDecode(accessToken);
  return {
    type: REFRESH,
    payload: decodedToken
  }
};

export const logoutAction = () => {
  JSCookie.remove('access');
  JSCookie.remove('refresh');

  return {
    type: LOGOUT
  }
};