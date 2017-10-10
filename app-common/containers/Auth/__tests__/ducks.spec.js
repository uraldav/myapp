import { Map } from 'immutable';
import reducer, { request, success, failure, initialState } from '../ducks';

describe('duck reducer', () => {
  it('should  set state as on request', () => {
    const payload = {
      login: 'max',
      password: '123',
    };
    expect(reducer(initialState, request(payload)))
    .toEqual(
      initialState
      .set('loading', true)
      .set('login', payload.login)
      .set('password', payload.password),
    );
  });

  it('should set state as on success', () => {
    const payload = {
      token: 'kszx,m`hdiowscx ndsfj',
      userData: {
        name: 'SomeName',
      },
    };
    expect(reducer(initialState, success(payload)))
    .toEqual(
      initialState
      .set('userData', Map(payload.userData))
      .set('token', payload.token)
      .set('loading', false),
    );
  });

  it('should set state as  on failiure', () => {
    const payload = {
      error: new Error('Error'),
    };
    expect(reducer(initialState, failure(payload)))
    .toEqual(
      initialState
      .set('error', payload.error)
      .set('loading', false),
    );
  });
});
