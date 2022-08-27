import React, { Suspense, useEffect } from 'react';
import Index from './markup/Markup';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { checkAutoLogin, checkActiveUser } from './services/AuthService';
import { isAuthenticated, getUserInfos } from './store/selectors/AuthSelectors';
import './css/plugins.css';
import './css/style.css';
import './css/templete.css';
import './css/skin/skin-1.css';
import './plugins/slick/slick.min.css';
import './plugins/slick/slick-theme.min.css';

import Login from './markup/Pages/Loginpage2';
import SignUp from './markup/Pages/Register1';
import Homepage from './markup/Pages/Homepage1';
import Markup from './markup/Markup';

// const SignUp = lazy(() => import('./markup/Pages/Register2'));
// const ForgotPassword = lazy(() => import('./markup/pages/ForgotPassword'));
// const Login = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./markup/Pages/Loginpage2')), 500);
//   });
// });

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch, props);
  }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register1" component={SignUp} />
    </Switch>
  );
  return (
    <Suspense>
      <Markup />
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    getUserInfos: getUserInfos(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));

//export default App;
