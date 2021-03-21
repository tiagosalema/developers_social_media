import { ALERT_SET, ALERT_REMOVE } from '../actions/types';

const initialState = [];

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALERT_SET:
      return [...state, payload];
    case ALERT_REMOVE:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
