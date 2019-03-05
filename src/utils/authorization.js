import axios from 'axios';
import Cookie from 'cookies-js';

const setAuthorizationToken = () => {
  axios.interceptors.request.use((config) => {
    const token = Cookie.get('jwtToken');

    if (token) {
      config.headers.authorization = token;
    }

    return config;
  }, err => (Promise.reject(err)));
};

export default setAuthorizationToken;
