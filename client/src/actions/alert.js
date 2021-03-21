//import { ALERT_SET, ALERT_REMOVE } from './types';
import { ALERT_SET, ALERT_REMOVE } from '../actions/types';

import { v4 } from 'uuid';

const setAlert = (msg, alertType, timeout = 3500) => dispatch => {
  const id = v4();
  dispatch({
    type: ALERT_SET,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({
      type: ALERT_REMOVE,
      payload: id,
    });
  }, timeout);
};

export default setAlert;
