import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { authLogout } from '../../app/actions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { AuthStackParamList } from '../../types/navigation';
import ROUTES from '../../utils/routes';

type ErrorRoute = RouteProp<AuthStackParamList, typeof ROUTES.ERRORSCREEN>;
type ErrorNav = StackNavigationProp<AuthStackParamList, typeof ROUTES.ERRORSCREEN>;

function ErrorScreen(): ReactElement {
  const navigation = useNavigation<ErrorNav>();
  const route = useRoute<ErrorRoute>();
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const title = route.params?.title ?? (auth?.isError ? 'Login failed' : 'Error');
  const message =
    route.params?.message ?? auth?.error ?? 'Something went wrong. Please try again.';

  const handleTryAgain = () => {
    dispatch(authLogout());
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.LOGIN }],
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 24, justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 10 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 15, lineHeight: 22, color: '#374151' }}>{message}</Text>

        <TouchableOpacity
          onPress={handleTryAgain}
          style={{
            marginTop: 18,
            backgroundColor: '#1e3a8a',
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ErrorScreen;
