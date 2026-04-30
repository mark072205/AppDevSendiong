import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { authLogin, USER_LOGIN_COMPLETE, USER_LOGIN_ERROR, USER_LOGIN_REQUEST } from '../../app/actions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { showError } from '../../components/alert_message';
import type { AuthStackParamList } from '../../types/navigation';
import { signInWithGoogle } from '../../utils/firebase';
import { IMG, ROUTES } from '../../utils';

const iconColor = '#6c757d';
const LOGIN_TOP_PADDING = 80;

//Improved Login screen with better error handling, loading state, and user feedback.

type LoginNav = StackNavigationProp<AuthStackParamList, typeof ROUTES.LOGIN>;

function Login(): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginNav>();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isLoading && auth.isError && auth.error) {
      showError({
        title: 'Login failed',
        message: auth.error,
      });
    }
  }, [auth.isLoading, auth.isError, auth.error]);

  const handleContinue = () => {
    if (username === '' || password === '') {
      showError({
        title: 'Invalid credentials',
        message: 'Please enter username or email and password',
      });
      return;
    }
    dispatch(authLogin({ username, password }));
  };

  const handleGoogleSignIn = async () => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const result = await signInWithGoogle();

      if (!result) {
        return;
      }

      dispatch({
        type: USER_LOGIN_COMPLETE,
        payload: result.userInfo,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Google sign-in failed';
      dispatch({
        type: USER_LOGIN_ERROR,
        error: message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: LOGIN_TOP_PADDING,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Image
            source={IMG.LOGO}
            style={{ width: 200, height: 64 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ width: '100%', marginBottom: 24 }}>
          <CustomTextInput
            label="Username or email"
            placeholder="Username or Email"
            value={username}
            onChangeText={setUsername}
            leftIcon={<MaterialIcons name="person" size={22} color={iconColor} />}
            containerStyle={{ marginBottom: 20 }}
          />
          <CustomTextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<MaterialIcons name="lock" size={22} color={iconColor} />}
            containerStyle={{ marginBottom: 8 }}
          />
        </View>

        <CustomButton
          label={auth.isLoading ? 'Signing in...' : 'Continue'}
          containerStyle={{
            backgroundColor: auth.isLoading ? '#6b7ba8' : '#1e3a8a',
            borderRadius: 8,
            marginBottom: 20,
            width: '100%',
            overflow: 'hidden',
          }}
          textStyle={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 16,
          }}
          onPress={handleContinue}
          disabled={auth.isLoading}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
          <Text style={{ marginHorizontal: 12, color: '#6b7280', fontSize: 14 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
        </View>

        <View
          style={{
            marginBottom: 24,
            alignItems: 'center',
          }}
        >
          <GoogleSigninButton
            style={{ width: '100%', height: 48, borderRadius: 8 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={handleGoogleSignIn}
            disabled={auth.isLoading}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          <Text style={{ color: '#5e6d55', fontSize: 15 }}>
            Don&apos;t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text
              style={{
                color: '#1e3a8a',
                fontWeight: '600',
                textDecorationLine: 'underline',
                fontSize: 15,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: '#9ca299',
            fontSize: 12,
            lineHeight: 18,
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          This app may use cookies for analytics, personalized content and ads. By continuing, you agree to
          this use of cookies.
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Text
            style={{
              color: '#1e3a8a',
              fontSize: 12,
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}
          >
            Learn more
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
