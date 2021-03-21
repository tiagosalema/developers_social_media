import axios from 'axios';

const setAuthedHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers['x-auth-token'];
  }
};

export default setAuthedHeader;
