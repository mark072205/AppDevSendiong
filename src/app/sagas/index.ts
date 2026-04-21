import { all } from 'redux-saga/effects';

import { userLogin } from './auth';

// Root saga to combine all individual sagas

export default function* rootSaga() {
  yield all([userLogin()]);
}
