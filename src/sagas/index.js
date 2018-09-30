import {
  watchUserLogin,
  watchUserRegister,
} from './global';

export default function * rootSaga () {
  yield [
    watchUserLogin(),
    watchUserRegister(),
  ];
}
