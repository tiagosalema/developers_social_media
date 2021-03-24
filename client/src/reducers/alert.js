import { ALERT_SET, ALERT_REMOVE, ALERT_MOVE_IN, ALERT_MOVE_OUT } from '../actions/types';

const initialState = [];

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALERT_SET:
      return [...state, payload];
    case ALERT_MOVE_IN:
      return state.map(alert => {
        if (alert.id !== payload) return alert;
        else return { ...alert, mount: 'mount' };
      });
    case ALERT_MOVE_OUT:
      return state.map(alert => {
        if (alert.id !== payload) return alert;
        else return { ...alert, mount: 'unmount' };
      });
    case ALERT_REMOVE:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
