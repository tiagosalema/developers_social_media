import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import setAlert from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = data;

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords don't match.", 'danger');
    } else {
      try {
        register(name, email, password);
      } catch ({ message }) {
        console.error(message);
      }
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div id='register' className='container'>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input name='name' value={name} onChange={onChange} type='text' placeholder='Name' />
        <input
          name='email'
          value={email}
          onChange={onChange}
          type='email'
          placeholder='Email Address'
        />
        <input
          name='password'
          value={password}
          onChange={onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='password2'
          value={password2}
          onChange={onChange}
          type='password'
          placeholder='Configm password'
        />
        <button action='submit'>Register</button>
      </form>
      <p>
        Already have an account? <Link to='/sign-in'>Sign in</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
