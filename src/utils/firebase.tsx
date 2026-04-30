import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '723424782640-n47kc70j0vbv1eloejdum9hpgl0evj4r.apps.googleusercontent.com',
});

export async function signInWithGoogle(): Promise<{ userInfo: unknown } | null> {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      return { userInfo: response.data };
    }

    return null;
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          throw new Error('Google sign-in already in progress.');
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new Error('Google Play Services not available on this device.');
        default:
          throw new Error('Google sign-in failed. Please try again.');
      }
    }

    throw new Error('Google sign-in failed. Please try again.');
  }
}