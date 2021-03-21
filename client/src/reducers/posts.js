import { GET_POSTS, GET_POST, POST_ERROR, CREATE_POST, DELETE_POST } from '../actions/types';

const initialState = {
  current: null,
  all: [],
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      console.log({ reducer: payload });
      return {
        ...state,
        all: payload,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
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
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
