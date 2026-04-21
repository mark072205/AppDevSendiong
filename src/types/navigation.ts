import ROUTES from '../utils/routes';

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.ERRORSCREEN]: { title?: string; message?: string } | undefined;
};

export type MainStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.PROFILE]: undefined;
};
