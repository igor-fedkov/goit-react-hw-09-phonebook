import axios from 'axios';

import { authActions, globalDataActions } from '../';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com'

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  }
}

const register = credentials => async dispatch => {
  dispatch(authActions.registrationRequest());

  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    dispatch(authActions.registrationSuccess(data));
  } catch (error) {
    dispatch(authActions.registrationError(error.message));
    dispatch(globalDataActions.createErrorText('Ошибка регистрации'));
  }
}

const logIn = (user) => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const { data } = await axios.post('/users/login', user);
    token.set(data.token);
    dispatch(authActions.loginSuccess(data));
  } catch (error) {
    dispatch(authActions.loginError(error.message))
    dispatch(globalDataActions.createErrorText('Не правильный логин или пароль'));
  }
}

const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    const { data } = await axios.post('/users/logout');
    token.unset();
    dispatch(authActions.logoutSuccess(data));
  } catch (error) {
    dispatch(authActions.logoutError(error.message))
  }
}

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');
    dispatch(authActions.getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message))
  }
}

const authOperations = { register, logIn, logOut, getCurrentUser };

export default authOperations;