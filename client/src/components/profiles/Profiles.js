import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfiles } from '../../actions/profile';
import './profiles.scss';

const Developers = ({ profiles, getProfiles }) => {
  useEffect(getProfiles, [getProfiles]);
  return (
    <div className='container'>
      <p>Connect with other developers...</p>
      {profiles?.map(profile => {
        if (!profile.user) return null;
        const {
          user: { name, avatar },
          status,
          skills,
          // experience,
          company,
        } = profile;
        return (
          <div key={profile._id} className='profile'>
            <img src={avatar} alt={`${name} profile`} />
            <div className='info'>
              <p>{name}</p>
              <p>
                {status}
                {company && ` at ${company}`}
              </p>
              <Link to={`/profiles/${profile.user._id}`} className='btn'>
                View profile
              </Link>
            </div>
            <div className='skills'>
              {skills.slice(0, 3).map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  profiles: state.profiles.all,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
