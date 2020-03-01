import { Card } from 'components/Card';
import { Container } from 'components/Container';
import { userApi } from 'helpers/apiCalls';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Pagination, Spin } from './style';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [getUsersError, setGetUsersError] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);
    userApi
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setGetUsersError(false);
      })
      .catch(() => setGetUsersError(true))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  const displayedUsers = users.slice(
    (currentPage - 1) * 10,
    (currentPage - 1) * 10 + 10,
  );

  return (
    <Container>
      {getUsersError && (
        <Alert
          message='An error has occured while trying to get users, please try again'
          type='error'
        />
      )}
      {isLoadingUsers && <Spin size='large' />}
      {users.length > 0 && (
        <Pagination
          defaultCurrent={currentPage}
          total={users.length}
          onChange={(newPage) => setCurrentPage(newPage)}
        />
      )}

      {displayedUsers.map((user) => {
        const { first_name, last_name, created_at, status } = user;
        const formattedDate = moment(created_at).format(
          'MMMM Do YYYY HH:mm:ss',
        );
        const isLocked = status === 'locked';
        return (
          <Card>
            <p>
              First name: <b>{isLocked ? <s>{first_name}</s> : first_name}</b>
            </p>
            <p>
              Last name: <b>{isLocked ? <s>{last_name}</s> : last_name}</b>
            </p>
            <p>
              Created At: <b>{formattedDate}</b>
            </p>
          </Card>
        );
      })}
    </Container>
  );
};

export default UserList;
