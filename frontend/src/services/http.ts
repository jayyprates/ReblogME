// Packages
import axios, { AxiosInstance } from 'axios'
import JSCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

// Project
import store from '../store';
import { logoutAction, refreshAction } from '../actions/session';
import { refresh } from './auth';

const requestInterceptor = async (config: any) => {
  const accessToken = JSCookie.get('access');

  if(!accessToken) {
    return config
  }

  config.headers.authorization = accessToken
    
  return config
};

const responseInterceptorOnError = async (error: any) => {
  const status = error.response ? error.response.status : null

  if(status == 403) {
    const refreshToken = JSCookie.get('refresh');

    if (!refreshToken) {
      return Promise.reject(error);
    }

    const refreshTokenPayload = jwtDecode(refreshToken);

    // @ts-ignore
    const refreshTokenExpired = refreshTokenPayload.exp - dayjs().unix() <= 0

    if(refreshTokenExpired) {
      store.dispatch(logoutAction())

      return Promise.reject(error);
    }

    const response = await refresh(refreshToken);

    if(response.status == 200) {
      store.dispatch(refreshAction(response.data.accessToken, response.data.refreshToken));

      error.config.headers['authorization'] = response.data.accessToken;

      return http.request(error.config);
    }    
  }

  return Promise.reject(error);
}

const http: AxiosInstance = axios.create({
    baseURL: process.env.API_URL
})

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use((response) => response, responseInterceptorOnError);

export default http;