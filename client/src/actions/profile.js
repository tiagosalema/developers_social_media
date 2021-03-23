import {
  GET_PROFILE,
  PROFILE_FAIL,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ADD_EXPERIENCE,
  PROFILE_ADD_EXPERIENCE_FAIL,
  PROFILE_DELETE_EXPERIENCE,
  DELETE_ACCOUNT,
  AUTH_LOG_OUT,
} from './types';
import axios from 'axios';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};

export const getProfile = profileId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${profileId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};

export const editProfile = profile => async dispatch => {
  try {
    const res = await axios.post('/api/profile', profile);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addExperience = experience => async dispatch => {
  try {
    const res = await axios.post('/api/profile/experience', experience);
    dispatch({
      type: PROFILE_ADD_EXPERIENCE,
      payload: { experience, _id: res.data._id },
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ADD_EXPERIENCE_FAIL,
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: PROFILE_DELETE_EXPERIENCE,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete('/api/profile');
    localStorage.removeItem('token');
    dispatch({
      type: DELETE_ACCOUNT,
    });
    dispatch({
      type: AUTH_LOG_OUT,
    });
  } catch (error) {
    console.error(error);
  }
};
