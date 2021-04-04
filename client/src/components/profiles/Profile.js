import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../actions/profile';
import './Profile.scss';

const Profile = ({ getProfile, match, profile }) => {
  useEffect(() => getProfile(match.params.id), [getProfile, match.params.id]);

  if (!profile) return null;

  const {
    social,
    skills,
    user: { name, avatar },
    status,
    company,
    website,
    location,
    bio,
    experience,
  } = profile;

  return (
    <section id='profile' className='container'>
      <Link to='/profiles' className='btn'>
        Back to profiles
      </Link>
      <header>
        <img src={avatar} alt='{name} profile' />
        <h1>{name}</h1>
        <p>
          {status}
          {company && ` at ${company}`}
        </p>
        <p>{location}</p>
        <div className='social-media'>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe'></i>
            </a>
          )}
          {social &&
            Object.entries(social).map(([social, site]) => (
              <a key={social} href={site} target='_blank' rel='noopener noreferrer'>
                <i className={`fab fa-${social}${social !== 'linkedin' ? '-square' : ''}`}></i>
              </a>
            ))}
        </div>
      </header>
      {bio && (
        <div className='about'>
          <h2>About me</h2>
          <p>{bio}</p>
        </div>
      )}
      {skills && (
        <div className='skills'>
          <h2>My skillset</h2>
          <ul>
            {skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {experience && (
        <div className='experience'>
          <h2>Experience</h2>
          <ul>
            {experience.map(exp => {
              const { title, company, from, to, location, description, _id } = exp;
              return (
                <li key={_id}>
                  <p className='title'>{title}</p>
                  <p>{company}</p>
                  <p>
                    {new Intl.DateTimeFormat().format(new Date(from))} &rarr;{' '}
                    {new Intl.DateTimeFormat().format(new Date(to))}
                  </p>
                  <p>{location}</p>
                  <p>{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = state => ({
  profile: state.profiles.current,
});

export default connect(mapStateToProps, { getProfile })(Profile);
