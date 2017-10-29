import JsCookie from 'js-cookie';

const cookie = {
  ...JsCookie,

  set: (...args) => {
    JsCookie.set(...args);
    cookie.notifyChange();
  },

  remove: (...args) => {
    JsCookie.remove(...args);
    cookie.notifyChange();
  },

  onChange(listener) {
    cookie.listeners.push(listener);
  },

  unChange(listener) {
    const index = cookie.listeners.indexOf(listener);

    if (index !== -1) {
      cookie.listeners.splice(index, 1);
    }
  },

  notifyChange() {
    cookie.listeners.forEach(listener => listener(JsCookie));
  },

  listeners: [],
};

export default cookie;
