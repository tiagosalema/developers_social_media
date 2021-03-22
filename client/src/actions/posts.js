import axios from 'axios';
import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  CREATE_COMMENT,
  COMMENT_FAIL,
} from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
    console.log(error);
  }
};

export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
    console.log(error);
  }
};

// text - STRING
export const createPost = text => async dispatch => {
  try {
    const res = await axios.post('/api/posts/', { text });
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const updateLikes = (postId, userId, isLikedByUser) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, userId, isLikedByUser },
    });
    await axios.post(`/api/posts/likes/${postId}`, { isLikedByUser });
  } catch (error) {
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, userId },
    });
    console.error(error.message);
  }
};

export const addComment = (postId, text) => async dispatch => {
  try {
    dispatch({
      type: CREATE_COMMENT,
      payload: text,
    });
    await axios.post(`/api/posts/comments/${postId}`, { text });
    console.log('The comment was created');
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
    });
    console.error(error.message);
  }
};
