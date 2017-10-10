import { fromJS, isImmutable } from 'immutable';
import {
  errorSelector,
  loadingSelector,
  loginSelector,
  passwordSelector,
  userDataSelector,
  tokenSelector,
} from '../selectors';

const rootState = fromJS({
  auth: {
    userData: {
      name: 'Elon',
      lastName: 'Mask',
    },
    loading: false,
    login: 'Elon',
    password: '12345',
    token: '. jdklsam,sadnKSJVLM,DVX',
    error: new Error('new Error'),
  },
});

describe('selectorsTest', () => {
  it('should show that userData is not immutable', () => {
    expect(isImmutable(userDataSelector(rootState))).toEqual(false);
    expect(userDataSelector(rootState)).toEqual(rootState.getIn(['auth', 'userData']).toJS());
  });

  it('errorSelector should work', () => {
    expect(errorSelector(rootState)).toEqual(rootState.getIn(['auth', 'error']));
  });

  it('loadingSelector should work', () => {
    expect(loadingSelector(rootState)).toEqual(rootState.getIn(['auth', 'loading']));
  });

  it('loginSelector should work', () => {
    expect(loginSelector(rootState)).toEqual(rootState.getIn(['auth', 'login']));
  });

  it('passwordSelector should work', () => {
    expect(passwordSelector(rootState)).toEqual(rootState.getIn(['auth', 'password']));
  });

  it('tokenSelector should work', () => {
    expect(tokenSelector(rootState)).toEqual(rootState.getIn(['auth', 'token']));
  });
});
