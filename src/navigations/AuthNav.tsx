import { createStackNavigator } from '@react-navigation/stack';

import ErrorScreen from '../screens/auth/ErrorScreen';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import type { AuthStackParamList } from '../types/navigation';
import ROUTES from '../utils/routes';

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen
        name={ROUTES.ERRORSCREEN}
        component={ErrorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
