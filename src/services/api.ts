import axios from 'axios';

const api = axios.create({
  baseURL: 'https://corebiz-test.herokuapp.com',
});

export default api;
