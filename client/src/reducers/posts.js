import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
  UPDATE_LIKES,
  CREATE_COMMENT,
  COMMENT_FAIL,
  GET_POST_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../actions/types';

const initialState = {
  current: {
    text: null,
    user: {},
    comments: [],
    likes: [],
  },
  all: [],
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        all: payload,
      };
    case GET_POST:
      const { likes, comments } = state.current;
      return {
        ...state,
        current: { ...payload, likes, comments },
      };
    case CREATE_POST:
      return {
        ...state,
        all: [payload, ...state.all],
      };
    case DELETE_POST:
      return {
        current: { ...state.current, text: null, user: {}, _id: null },
        all: state.all.filter(post => post._id !== payload),
      };
    case UPDATE_LIKES:
      const { postId, userId, isLikedByUser } = payload;
      return {
        ...state,
        all: state.all.map(post => {
          if (post._id === postId) {
            let likes = [...post.likes];
            if (isLikedByUser > -1) {
              likes.splice(isLikedByUser, 1);
            } else {
              likes.push(userId);
            }
            return {
              ...post,
              likes,
            };
          } else {
            return post;
          }
        }),
      };
    case CREATE_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: [payload, ...state.current.comments],
        },
      };
    case COMMENT_FAIL:
      return state;
    case GET_POST_COMMENTS:
      return {
        ...state,
        current: {
          ...state.current,
          comments: payload,
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: state.current.comments.map(comment => {
            if (comment._id === payload._id) {
              return { ...comment, text: payload.text };
            } else {
              return comment;
            }
          }),
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: state.current.comments.filter(comment => comment._id !== payload),
        },
      };
    case POST_ERROR:
    default:
      return state;
  }
}
