const cookieStorage = {};

export default {
  set(key, value) {
    return Object.assign(cookieStorage, { [key]: value });
  },
  remove(key) {
    return delete cookieStorage[key];
  }
};
