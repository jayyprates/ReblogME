// Project
import http from './http';

export const signup = (email: string, username: string, password: string) => {
  return http.post('/auth/signup', { email, username, password });
}

export const login = (username: string, password: string) => {
  return http.post('/auth/login', { username, password });
}

export const refresh = (refresh: string) => {
  return http.post('/auth/refresh', {}, {
    headers: {
      refreshToken: refresh
    }
  });
}
