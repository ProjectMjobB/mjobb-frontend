import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isUserLoggedIn } from '../services/AuthService';

class AuthenticatedRoute extends Component {
  componentDidMount() {
    isUserLoggedIn();
  }

  render() {
    if (isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
