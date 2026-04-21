import React from 'react';
import { View } from 'react-native';

import AppNav from './src/navigations';

import rootSaga from './src/app/sagas';
import configureStore from './src/app/reducers';
import { Provider } from 'react-redux';

//JS to TSX conversion, with added comments for clarity and maintainability. The App component sets up the Redux store and provides it to the rest of the app, while also rendering the main navigation component.
// NOTE: redux-persist disabled in `src/app/reducers/index.ts`.
// const { store, persistor, runSaga } = configureStore();
const { store, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      {/* Old PersistGate wiring (kept for reference)
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <AppNav />
        </View>
      </PersistGate>
      */}
      <View style={{ flex: 1 }}>
        <AppNav />
      </View>
    </Provider>
  );
};

export default App;
