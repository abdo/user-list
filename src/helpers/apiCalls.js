import http, { serverPath } from './httpService';

export const userApi = {
  getAllUsers: () => {
    return http.get(`${serverPath}/users.json`);
  },

  editUser: ({ userId, newData }) => {
    return http.put(`${serverPath}/users/${userId}.json`, newData);
  },
};
