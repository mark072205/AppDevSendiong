import type { UnknownAction } from 'redux';

//Reducer for authentication state, handling login requests, successes, errors, and reset actions.

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
  USER_LOGIN_RESET,
} from '../actions';

export type AuthState = {
  data: unknown;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

const INITIALSTATE: AuthState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
};

export default function reducer(state: AuthState = INITIALSTATE, action: UnknownAction): AuthState {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      };

    case USER_LOGIN_COMPLETE: {
      const a = action as { type: typeof USER_LOGIN_COMPLETE; payload?: unknown };
      return {
        ...state,
        data: a.payload ?? null,
        isLoading: false,
        isError: false,
        error: null,
      };
    }

    case USER_LOGIN_ERROR: {
      const a = action as { type: typeof USER_LOGIN_ERROR; error?: string };
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        error: a.error ?? 'Login failed',
      };
    }

    case USER_LOGIN_RESET:
      return INITIALSTATE;

    default:
      return state;
  }
}
