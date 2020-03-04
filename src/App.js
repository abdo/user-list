import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';

import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import UserList from './pages/UserList';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={UserList} />
      <Route path='/new' component={CreateUser} />
      <Route path='/edit/:id' component={EditUser} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
