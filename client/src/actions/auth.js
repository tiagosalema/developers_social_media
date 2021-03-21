import axios from 'axios';

import { AUTH_FAIL, AUTH_LOAD_USER, AUTH_LOG_OUT } from '../actions/types';
import setAuthedHeader from '../utils/setAuthedHeader';

import setAlert from './alert';

export const loadUser = () => async dispatch => {
  setAuthedHeader();
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: AUTH_LOAD_USER,
      payload: {
        user: res.data,
        token: localStorage.getItem('token'),
      },
    });
  } catch (e) {
    console.clear();
    console.log('You are not logged in.');
  }
};

const connectApi = fn => async dispatch => {
  try {
    const res = await fn();
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({
      type: AUTH_FAIL,
    });
    localStorage.removeItem('token');
  }
};

export const register = (name, email, password) => {
  return connectApi(() => axios.post('/api/users', { name, email, password }));
};
export const signIn = (email, password) => {
  return connectApi(() => axios.post('/api/auth', { email, password }));
};
export const signOut = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: AUTH_LOG_OUT });
};

/*
export const register = (name, email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/users', { name, email, password });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({
      type: AUTH_FAIL,
    });
    localStorage.removeItem('token');
  }
};

export const signIn = (email, password) => async dispatch => {
  try {
    const res = await axios.get('/api/auth', { email, password });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};
*/
