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
} from '../actions/types';

const initialState = {
  current: null,
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
        ...state,
        all: state.all.filter(post => post._id !== payload),
      };
    case POST_ERROR:
      return initialState;
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
          comments: [...state.current.comments, payload],
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
    default:
      return state;
  }
}
