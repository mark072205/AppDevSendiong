import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ReactElement } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { authLogout } from '../app/actions';
import { useAppDispatch } from '../app/hooks';
import type { MainStackParamList } from '../types/navigation';
import { IMG, ROUTES } from '../utils';

type HomeNavProp = StackNavigationProp<MainStackParamList, typeof ROUTES.HOME>;

function HomeScreen(): ReactElement {
  const navigation = useNavigation<HomeNavProp>();
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'red',
      }}
    >
      <Image source={IMG.LOGO} style={{ width: 320, height: 100 }} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.PROFILE);
        }}
      >
        <View
          style={{
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 24, color: 'white' }}>VISIT PROFILE</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(authLogout());
        }}
      >
        <View
          style={{
            backgroundColor: '#1e3a8a',
            padding: 10,
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 24, color: 'white' }}>LOG OUT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
