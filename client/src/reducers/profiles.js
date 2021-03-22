import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_FAIL,
  UPDATE_PROFILE,
  PROFILE_ADD_EXPERIENCE,
  // PROFILE_ADD_EXPERIENCE_FAIL,
  PROFILE_DELETE_EXPERIENCE,
  DELETE_ACCOUNT,
} from '../actions/types';

const initialState = {
  current: null,
  all: [],
};

export default function profilesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        all: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        current: payload,
      };
    case PROFILE_FAIL:
      return {
        ...initialState,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        current: payload,
      };
    case PROFILE_ADD_EXPERIENCE:
      return {
        ...state,
        current: {
          ...state.current,
          experience: [
            ...state.current.experience,
            {
              ...payload.experience,
              _id: payload._id,
            },
          ],
        },
      };
    case PROFILE_DELETE_EXPERIENCE:
      const experienceId = payload;
      return {
        ...state,
        current: {
          ...state.current,
          experience: state.current.experience.filter(exp => exp._id !== experienceId),
        },
      };
    case DELETE_ACCOUNT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
