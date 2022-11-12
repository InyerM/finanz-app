import axios from 'axios';

const finanzApi = axios.create({
  baseURL: '/api',
});

export default finanzApi