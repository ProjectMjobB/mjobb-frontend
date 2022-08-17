import axios from 'axios';
import swal from 'sweetalert';
import { loginConfirmedAction, logout } from '../store/actions/AuthActions';

export function signUp(payload) {
  const data = payload;
  return axios.post(`/oauth/register`, data);
}

export async function login(email, password) {
  return axios.post(
    `/oauth/token?username=${email}&grant_type=password&password=${password}`,
    {},
    {
      auth: {
        username: 'mjobb-client',
        password: 'mjobb-secret',
      },
    }
  );
}

export function getUserInfo(token) {
  return axios.get(`/api/v1.0/users/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case 'EMAIL_EXISTS':
      //return 'Email already exists';
      swal('Oops', 'Email already exists', 'error');
      break;
    case 'EMAIL_NOT_FOUND':
      //return 'Email not found';
      swal('Oops', 'Email not found', 'error', { button: 'Try Again!' });
      break;
    case 'INVALID_PASSWORD':
      //return 'Invalid Password';
      swal('Oops', 'Invalid Password', 'error', { button: 'Try Again!' });
      break;
    case 'USER_DISABLED':
      return 'User Disabled';

    default:
      return '';
  }
}

export function saveUserInfoLocalStorage(data) {
  localStorage.setItem('userInfo', JSON.stringify(data));
}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails['expireDate'] = new Date(
    new Date().getTime() + tokenDetails.expires_in * 1000
  );
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function isUserLoggedIn() {
  let user = localStorage.getItem('userDetails');
  if (user === null) {
    return false;
  } else {
    return true;
  }
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('userDetails');
  let tokenDetails = '';
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(logout(history));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, history);
}
