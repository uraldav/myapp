import { call, put } from 'redux-saga/effects';
import { restoreUserData, requestSaga } from '../sagas';
import mockServices from '../../../services/mockServices';
import {
  success,
  failure,
} from '../ducks';

const { api, cookie } = mockServices();

describe('auth/sagas/restoreUserData', () => {
  const saga = restoreUserData();
  it('get services', () => {
    saga.next();
    saga.next(api);
  });

  it('call fetchUserData', () => {
    const actual = saga.next(cookie).value;
    const expected = call(api.auth.fetchUserData, cookie.get('token'));
    expect(actual).toEqual(expected);
  });

  it('put sucsess', () => {
    const mockResponse = { blah: 123 };
    const actual = saga.next(mockResponse).value;
    const expected = put(success(mockResponse));
    expect(expected).toEqual(actual);
  });

  it('put failure', () => {
    const mock = { message: 'Wasted' };
    const actual = saga.throw(mock).value;
    const expected = put(failure(mock));
    expect(actual).toEqual(expected);
  });

  it('done', () => {
    const actual = saga.next();
    const expected = {
      done: true,
      value: undefined,
    };
    expect(actual).toEqual(expected);
  });
});

describe('auth/sagas/requestSaga', () => {
  const saga = requestSaga();
  it('get services', () => {
    saga.next();
    saga.next(api);
    saga.next(cookie);
  });

  it('call authorize', () => {
    const login = 'login';
    const password = 'password';
    saga.next(login);
    const actual = saga.next(password).value;
    const expected = call(api.auth.authorize, login, password);
    expect(expected).toEqual(actual);
  });

  it('put sucsess', () => {
    const mockResponse = { blah: 123 };
    const actual = saga.next(mockResponse).value;
    const expected = put(success(mockResponse));
    expect(expected).toEqual(actual);
  });

  it('put failure', () => {
    const mock = { message: 'Wasted' };
    const actual = saga.throw(mock).value;
    const expected = put(failure(mock));
    expect(actual).toEqual(expected);
  });

  it('done', () => {
    const actual = saga.next();
    const expected = {
      done: true,
      value: undefined,
    };
    expect(actual).toEqual(expected);
  });
});
