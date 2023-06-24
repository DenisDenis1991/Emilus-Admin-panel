import axios from 'axios';

const BACKEND_URL = 'https://jsonplaceholder.typicode.com/users';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      throw error;
    }
  );
  return api
}