import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';

import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={UserList} />
      <Route path='/new' component={CreateUser} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
