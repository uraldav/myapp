import JsCookie from 'js-cookie';

const cookie = {
  ...JsCookie,

  set: (...args) => {
    JsCookie.set(...args);
    this.notifyChange();
  },

  remove: (...args) => {
    JsCookie.remove(...args);
    this.notifyChange();
  },

  onChange(listener) {
    this.listeners.push(listener);
  },

  unChange(listener) {
    const index = this.listeners.indexOf(listener);

    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  },

  notifyChange() {
    this.listeners.forEach(listener => listener(JsCookie));
  },

  listeners: [],
};

export default cookie;
