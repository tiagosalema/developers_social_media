import { AUTH_FAIL, AUTH_LOAD_USER, AUTH_LOG_OUT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOAD_USER:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case AUTH_FAIL:
    case AUTH_LOG_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
