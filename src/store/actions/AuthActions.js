import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
  successfullLogin,
  getUserInfo,
  saveUserInfoLocalStorage,
} from '../../services/AuthService';

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const USER_CONFIRMED_ACTION = '[User action] confirmed user';
export function signupAction(payload, history) {
  return (dispatch) => {
    signUp(payload)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        // dispatch(confirmedSignupAction(response.data));
        history.push('/login');
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem('userDetails');
  localStorage.removeItem('userInfo');
  history.push('/login');
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        const data = response.data;
        saveTokenInLocalStorage(response.data);
        getUserInfo(data.access_token)
          .then((response) => {
            saveUserInfoLocalStorage(response.data);
            dispatch(userConfirmedAction(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
        // dispatch(successfullLogin(data, history));
        runLogoutTimer(dispatch, data.expires_in * 1000, history);
        dispatch(loginConfirmedAction(data));
        history.push('/home');
      })
      .catch((error) => {
        //console.log(error);
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function userConfirmedAction(data) {
  return {
    type: USER_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
