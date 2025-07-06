import axios from 'axios';
import LocalStorageService from '../utils/localStorageService/localStorageService.ts';
import { getAuthRoute } from '../api/auth-token/tokenApi.ts';

export const clientUnAuthorized = axios.create();

export const client = axios.create();

client.interceptors.request.use((config) => {
  const token = LocalStorageService.getAccessToken();
  if (token) {
    /* config.timeout = 2000;*/
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      // originalRequest._retry &&
      error.config.headers?.GrandType === 'refresh_token'
    ) {
      LocalStorageService.clearToken();
      window.location.href = '/';
      window.location.reload();
    }
    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return client(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve) => {
        client
          .post(
            getAuthRoute(),
            `grant_type=refresh_token&refresh_token=${LocalStorageService.getRefreshToken()}`,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                GrandType: 'refresh_token',
              },
              auth: { username: 'web', password: 'R@d7vJD6uR' },
            },
          )
          .then((res) => {
            LocalStorageService.setToken(res?.data);
            client.defaults.headers.common.Authorization = `Bearer ${LocalStorageService.getAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${LocalStorageService.getAccessToken}`;

            processQueue(null, LocalStorageService.getAccessToken);
            resolve(client(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            // LocalStorageService.clearToken();
            // window.location.reload();
            // reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);
