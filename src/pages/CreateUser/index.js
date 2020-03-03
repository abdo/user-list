import { Card } from 'components/Card';
import { Link } from 'react-router-dom';
import { userApi } from 'helpers/apiCalls';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import message from 'antd/lib/message';
import React, { useState } from 'react';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';

import { Container, RedirectHint } from './style';

const { Option } = Select;

const CreateUser = ({ history }) => {
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    status: '',
  });

  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const onCreateUser = () => {
    setIsCreatingUser(true);
    userApi
      .createUser({ userData: fields })
      .then(() => {
        message.success('User created successfully');
        history.push('/');
      })
      .catch(() => message.error('Error while creating user'))
      .finally(() => setIsCreatingUser(false));
  };

  const isCreateDisabled = Object.values(fields).some((value) => !value);
  const onChangeInput = (value, label) =>
    setFields({
      ...fields,
      [label]: value,
    });

  if (isCreatingUser) {
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
          Ready to create another great user?
          <br /> Let's do it!
        </h3>
        <Input
          placeholder='First Name'
          onChange={(e) => onChangeInput(e.target.value, 'first_name')}
          maxLength={100}
        />
        <Input
          placeholder='Last Name'
          onChange={(e) => onChangeInput(e.target.value, 'last_name')}
          maxLength={100}
        />
        <Select
          placeholder='Status'
          onChange={(value) => onChangeInput(value, 'status')}
        >
          <Option value='active'>Active</Option>
          <Option value='locked'>Locked</Option>
        </Select>
        <Button
          type='primary'
          disabled={isCreateDisabled}
          title={isCreateDisabled ? 'Please fill all fields properly' : ''}
          onClick={onCreateUser}
        >
          Create
        </Button>
      </Card>
    </Container>
  );
};

export default CreateUser;
