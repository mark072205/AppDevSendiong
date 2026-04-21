import type { LoginCredentials } from '../types/auth';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';

export const authLogin = (payload: LoginCredentials) => ({
  type: USER_LOGIN,
  payload,
});

export const authLogout = () => ({
  type: USER_LOGIN_RESET,
});
