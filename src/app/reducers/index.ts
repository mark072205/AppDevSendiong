import { applyMiddleware, combineReducers, createStore } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Root reducer combining all individual reducers, currently only auth, and configuring the Redux store with saga middleware.

import auth from './auth';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ConfigureStoreResult = {
  store: Store<RootState>;
  persistor: null;
  runSaga: typeof sagaMiddleware.run;
};

export default function configureStore(): ConfigureStoreResult {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = null;
  const runSaga = sagaMiddleware.run;

  return { store, persistor, runSaga };
}
