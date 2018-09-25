import axios from 'axios';

const instance = axios.create({});
instance.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
);
export default instance;
