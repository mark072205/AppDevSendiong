import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import { useAppSelector } from '../app/hooks';

import AuthNav from './AuthNav';
import MainNav from './MainNav';

export default function AppNavigation() {
  const isDarkMode = useColorScheme() === 'dark';
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = !!auth?.data;

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
}
