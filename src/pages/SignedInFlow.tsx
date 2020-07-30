import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Login  } from './Login';

export const SignedInFlow = (props:any) => {
  return (
    <Switch>
        <Route exact path='/'>
            <Redirect to='/login' />
        </Route>
        <Route exact path='/login'>
            <Login {...props} />
        </Route>
    </Switch>
  );
};
