
export default function mockServices () {
  return ({
    api: {
      auth: {
        authorize: jest.fn(),
        fetchUserData: jest.fn(),
      },
    },
    cookie: {
      get: jest.fn(),
      set: jest.fn(),
    },
  });
}
