import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { signIn } from '../../actions/auth';

import { connect } from 'react-redux';

const SignIn = ({ isAuthenticated, signIn }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = data;

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  const onSumbit = async e => {
    e.preventDefault();
    try {
      signIn(email, password);
    } catch ({ message }) {
      console.error(message);
    }
  };
  return (
    <div id='sign-in' className='container'>
      <h1>Login</h1>
      <form onSubmit={onSumbit}>
        <input
          name='email'
          value={email}
          onChange={onChange}
          type='email'
          placeholder='Email Address'
          autoComplete='username'
        />
        <input
          autoComplete='current-password'
          name='password'
          value={password}
          onChange={onChange}
          type='password'
          placeholder='Password'
        />
        <button action='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(SignIn);
