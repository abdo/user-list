import http, { serverPath } from './httpService';

const config = {
  headers: { 'Content-Type': 'application/json' },
};

export const userApi = {
  getAllUsers: () => {
    return http.get(serverPath, config);
  },
};