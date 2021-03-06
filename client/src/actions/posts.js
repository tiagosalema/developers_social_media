import axios from 'axios';
import setAlert from './alert';
import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  CREATE_COMMENT,
  COMMENT_FAIL,
  GET_POST_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
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
    console.error(error);
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
    console.error(error);
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
    dispatch(setAlert('Post created.'));
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
    dispatch(setAlert('Post deleted.'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const updateLikes = (postId, userId, isLikedByUser) => async dispatch => {
  try {
    await axios.post(`/api/posts/likes/${postId}`, { isLikedByUser });
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, userId, isLikedByUser },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const addComment = (postId, text) => async dispatch => {
  try {
    const res = await axios.post('/api/comments', { text, postId });
    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment submitted.'));
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
    });
    console.error(error.message);
  }
};

export const getComments = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/comments?postId=${postId}`);
    dispatch({
      type: GET_POST_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const editComment = (commentId, text) => async dispatch => {
  try {
    const res = await axios.post(`/api/comments/${commentId}`, { text });
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data.editedComment,
    });
    dispatch(setAlert('Comment edited.'));
  } catch (error) {
    dispatch(setAlert(error.message, 'danger'));
    console.error(error.message);
  }
};
export const deleteComment = commentId => async dispatch => {
  try {
    const res = await axios.delete(`/api/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data.deletedComment._id,
    });
    dispatch(setAlert('Comment deleted.'));
  } catch (error) {
    dispatch(setAlert(error.message, 'danger'));
    console.error(error.message);
  }
};
