import axios from 'axios';

<<<<<<< HEAD


=======
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

let isRefreshing = false;
<<<<<<< HEAD
let failedRequests: Array<() => void> = [];
=======
let failedRequests: any[] = [];
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          failedRequests.push(() => resolve(API(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post('/auth/refresh-token');
        const retryOriginal = await API(originalRequest);
        failedRequests.forEach(cb => cb());
        failedRequests = [];
        return retryOriginal;
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

<<<<<<< HEAD
export default API;

export const deleteUser = () => API.delete('/auth/me');
=======
export default API;
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
