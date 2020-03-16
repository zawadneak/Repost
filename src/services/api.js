import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.instagram.com/oembed',
});

export default api;
