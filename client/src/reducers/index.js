import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profiles from './profiles';
import posts from './posts';

export default combineReducers({
  alert,
  auth,
  profiles,
  posts,
});
