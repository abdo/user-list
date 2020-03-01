import { Card } from 'components/Card';
import { userApi } from 'helpers/apiCalls';
import Alert from 'antd/lib/alert';
import message from 'antd/lib/message';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import React, { useEffect, useState } from 'react';
import Spin from 'antd/lib/spin';
import Switch from 'antd/lib/switch';

import { Container, StatusIndicator } from './style';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [getUsersError, setGetUsersError] = useState(false);

  // An object whose keys is user id and value is true or false
  const [isEditingUser, setIsEditingUser] = useState({});

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

  const onEditUserStatus = ({ userId, newStatus }) => {
    setIsEditingUser({ ...isEditingUser, [userId]: true });
    userApi
      .editUser({ userId, newData: { status: newStatus } })
      .then(() => {
        setUsers(
          users.map((user) => {
            if (user.id === userId) {
              user.status = newStatus;
            }
            return user;
          }),
        );
      })
      .catch(() => message.error('Error while editing user'))
      .finally(() => setIsEditingUser({ ...isEditingUser, [userId]: false }));
  };

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
        const { id, first_name, last_name, created_at, status } = user;
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
            <StatusIndicator>
              <p>{status}</p>
              <Switch
                defaultChecked={!isLocked}
                disabled={isEditingUser[id]}
                onChange={(checked) =>
                  onEditUserStatus({
                    userId: id,
                    newStatus: checked ? 'active' : 'locked',
                  })
                }
              />
              {isEditingUser[id] && <Spin size='small' />}
            </StatusIndicator>
          </Card>
        );
      })}
    </Container>
  );
};

export default UserList;
