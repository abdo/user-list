import http, { serverPath } from './httpService';

export const userApi = {
  getAllUsers: () => {
    return http.get(`${serverPath}/users.json`);
  },

  getUser: ({ userId }) => {
    return http.get(`${serverPath}/users/${userId}.json`);
  },

  createUser: ({ userData }) => {
    return http.post(`${serverPath}/users.json`, userData);
  },

  editUser: ({ userId, newData }) => {
    return http.put(`${serverPath}/users/${userId}.json`, newData);
  },
};
