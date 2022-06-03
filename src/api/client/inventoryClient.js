import axios from 'axios';
import appConfig from '../../config/index';
import RequestInterceptor from '../intercepters/interceptors';

const { request } = RequestInterceptor;  

const InventoryAPIClient = axios.create({
  baseURL: appConfig.apiURLs.base,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'token 1234'
  },
   proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 8080,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  withCredentials: false,
  validateStatus: (status) => {
    return status <= 500
  }
})

InventoryAPIClient.interceptors.request.use(request)

export {
  InventoryAPIClient,
}