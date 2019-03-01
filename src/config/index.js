export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://turing-shop.herokuapp.com/api/api' : 'http://localhost:3000/api',
};
