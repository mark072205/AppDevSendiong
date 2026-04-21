/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import App from './App';
import { name as appName } from './app.json';

MaterialIcons.loadFont().catch(() => {
  // Font is already bundled/loaded in most cases.
});

AppRegistry.registerComponent(appName, () => App);
