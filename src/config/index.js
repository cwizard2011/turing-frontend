export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://turing-shop.herokuapp.com/api/v2' : 'http://localhost:3000/api/v2',
  productUrl: 'https://res.cloudinary.com/cwizard/image/upload/v1550669866/Turing/product%20images'
};
