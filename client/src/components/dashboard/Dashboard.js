import React, { useEffect } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteExperience, deleteAccount } from '../../actions/profile';

import Table from '../shared/Table';

const Dashboard = ({ user, profiles, getCurrentProfile, deleteExperience, deleteAccount }) => {
  useEffect(getCurrentProfile, [getCurrentProfile]);
  const history = useHistory();
  if (!profiles?.skills)
    return (
      <section id='dashboard' className='container'>
        <p>Welcome, {user.name}!</p>
        <p>It looks like you don't have a profile yet.</p>
        <Link to='/edit-profile' className='btn'>
          Create a profile
        </Link>
      </section>
    );

  const { website, bio, experience, location, company, status, social, skills } = profiles;

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure? This action cannot be undone...')) {
      deleteAccount();
      history.push('/');
    }
  };
  return (
    <section id='dashboard' className='container'>
      <p>Welcome, {user.name}!</p>
      <h2>Profile information:</h2>
      <p>
        {status} {company && ` at ${company}`}
      </p>
      <h3>Location:</h3>
      <p>{location}</p>
      <h3>Website:</h3>
      <p>{website}</p>
      <h3>About me:</h3>
      <p>{bio}</p>
      <h3>Skills:</h3>
      <ul>
        {skills?.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <Table data={experience} deleteItem={deleteExperience} label='Experience' />
      <h3>Social:</h3>
      <ul>
        {social &&
          Object.entries(social).map(([media, link]) => (
            <li key={link}>
              {media}: {link}
            </li>
          ))}
      </ul>
      <Link to='edit-profile' className='btn'>
        Edit profile
      </Link>
      <Link to='add-experience' className='btn'>
        Add experience
      </Link>
      <Link to='#!' className='btn btn-red' onClick={handleDeleteAccount}>
        Delete account
      </Link>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profiles: state.profiles.current,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteExperience, deleteAccount })(
  Dashboard,
);
