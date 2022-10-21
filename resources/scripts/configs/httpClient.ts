import { API_URL } from './constants';
import Cookie from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const httpClientWithAuth: AxiosInstance = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params: any) => qs.stringify(params, { encode: false })
});

httpClientWithAuth.defaults.headers.common['Content-Type'] = 'application/json';

httpClientWithAuth.interceptors.request.use((config: AxiosRequestConfig) => {
  const { headers, ...restConfig } = config;
  return {
    ...restConfig,
    headers: {
      ...headers,
      Authorization: Cookie.get('securityId') ? `Bearer ${Cookie.get('securityId')}` : ''
    }
  };
},
(error) => {
  return Promise.reject(error);
});

export { httpClientWithAuth };
export default httpClient;
