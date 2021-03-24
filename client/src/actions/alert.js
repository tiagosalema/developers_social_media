import { ALERT_SET, ALERT_REMOVE, ALERT_MOVE_IN, ALERT_MOVE_OUT } from '../actions/types';

import { v4 } from 'uuid';

const setAlert = (msg, alertType, timeout = 3500) => dispatch => {
  const id = v4();
  dispatch({
    type: ALERT_SET,
    payload: { msg, alertType, timeout, id },
  });
  process.nextTick(() => {
    dispatch({
      type: ALERT_MOVE_IN,
      payload: id,
    });
  });

  setTimeout(() => {
    dispatch({
      type: ALERT_MOVE_OUT,
      payload: id,
    });
  }, timeout - 300);
  setTimeout(() => {
    dispatch({
      type: ALERT_REMOVE,
      payload: id,
    });
  }, timeout);
};

export default setAlert;
