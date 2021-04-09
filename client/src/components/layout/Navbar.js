import './Navbar.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { signOut } from '../../actions/auth';

export const Navbar = ({ signOut, isAuthenticated }) => {
  const authLinks = isAuthenticated ? (
    <>
      <Link to='/profiles'>
        <i className='fas fa-users'></i> Developers
      </Link>
      <Link to='/posts'>
        <i className='fas fa-book-open'></i> Posts
      </Link>
      <Link to='/dashboard'>
        <i className='fas fa-columns'></i> Dashboard
      </Link>
      <Link to='/log-out' onClick={signOut}>
        <i className='fas fa-sign-out-alt'></i> Log out
      </Link>
    </>
  ) : (
    <>
      <Link to='/sign-in'>
        <i className='fas fa-sign-in-alt'></i> Sign in
      </Link>
    </>
  );
  return (
    <header id='header' className='navbar'>
      <Link to='/'>Homepage</Link>
      <div className='right'>{authLinks}</div>
    </header>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signOut })(Navbar);
