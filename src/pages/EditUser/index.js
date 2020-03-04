import { Card } from 'components/Card';
import { Link } from 'react-router-dom';
import { RedirectHint } from 'components/RedirectHint';
import { userApi } from 'helpers/apiCalls';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import message from 'antd/lib/message';
import React, { useEffect, useState } from 'react';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';

import { Container } from './style';

const { Option } = Select;

const EditUser = ({
  history,
  location: { state: passedState },
  match: {
    params: { id: paramId },
  },
}) => {
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    status: '',
  });

  const [originalFields, setOriginalFields] = useState({});

  const [userId, setUserId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const passedUser = passedState?.user;
    if (passedUser) {
      const { id, ...userFields } = passedUser;
      setUserId(id);
      setFields(userFields);
      setOriginalFields(userFields);
    } else {
      setIsLoading(true);
      userApi
        .getUser({ userId: paramId })
        .then((res) => {
          const user = res.data;
          const { id, ...userFields } = user;
          setUserId(id);
          setFields(userFields);
          setOriginalFields(userFields);
        })
        .catch(() => message.error('An error happened'))
        .finally(() => setIsLoading(false));
    }
  }, []); //eslint-disable-line

  const onEditUser = () => {
    setIsLoading(true);
    userApi
      .editUser({ userId, newData: fields })
      .then(() => {
        message.success('User edited successfully');
        history.push('/');
      })
      .catch(() => message.error('Error while editing user'))
      .finally(() => setIsLoading(false));
  };

  const areFieldsEdited = Object.entries(fields).some((entry) => {
    const [key, value] = entry;
    return originalFields[key] !== value;
  });

  const isEditDisabled =
    Object.values(fields).some((value) => !value) || !areFieldsEdited;

  const onChangeInput = (value, label) =>
    setFields({
      ...fields,
      [label]: value,
    });

  if (isLoading) {
    return (
      <Container>
        <Spin size='large' />
      </Container>
    );
  }
  return (
    <Container>
      <Link to='/'>
        <RedirectHint>
          <LeftOutlined /> Go to user list
        </RedirectHint>
      </Link>
      <Card>
        <h3>
          Ready to edit this perfect user to make him/her even more perfect?
          <br /> Let's do it!
        </h3>
        <Input
          placeholder='First Name'
          onChange={(e) => onChangeInput(e.target.value, 'first_name')}
          maxLength={100}
          value={fields.first_name}
        />
        <Input
          placeholder='Last Name'
          onChange={(e) => onChangeInput(e.target.value, 'last_name')}
          maxLength={100}
          value={fields.last_name}
        />
        <Select
          placeholder='Status'
          onChange={(value) => onChangeInput(value, 'status')}
          value={fields.status}
        >
          <Option value='active'>Active</Option>
          <Option value='locked'>Locked</Option>
        </Select>
        <Button
          type='primary'
          disabled={isEditDisabled}
          title={isEditDisabled ? 'Please fill all fields properly' : ''}
          onClick={onEditUser}
        >
          Edit
        </Button>
      </Card>
    </Container>
  );
};

export default EditUser;
