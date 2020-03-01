import React, { useEffect, useState } from 'react';

import { userApi } from '../../helpers/apiCalls';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [getUsersError, setGetUsersError] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);
    userApi
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => setGetUsersError(true))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  return <h1>User List</h1>;
};

export default UserList;
