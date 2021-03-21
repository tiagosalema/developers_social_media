import React, { useState, useEffect } from 'react';
import { getCurrentProfile, editProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const EditProfile = ({ current, getCurrentProfile, editProfile }) => {
  const [data, setData] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    bio: '',
    youtube: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    facebook: '',
  });
  useEffect(() => {
    if (!current) {
      getCurrentProfile();
    } else
      setData({
        status: current.status || '',
        company: current.company || '',
        website: current.website || '',
        location: current.location || '',
        skills: current.skills?.join(', ') || '',
        bio: current.bio || '',
        youtube: current.social?.youtube || '',
        twitter: current.social?.twitter || '',
        instagram: current.social?.instagram || '',
        linkedin: current.social?.linkedin || '',
        facebook: current.social?.facebook || '',
      });
  }, [getCurrentProfile, current]);
  const history = useHistory();
  const {
    status,
    company,
    website,
    location,
    skills,
    bio,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = data;

  const onSubmit = e => {
    e.preventDefault();
    editProfile(data);
    history.push('/dashboard');
  };
  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };
  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <label>
          <span>Status</span>
          <input type='text' value={status} name='status' onChange={onChange} required />
        </label>
        <label>
          <span>Company</span>
          <input type='text' value={company} name='company' onChange={onChange} />
        </label>
        <label>
          <span>Website</span>
          <input type='text' value={website} name='website' onChange={onChange} required />
        </label>
        <label>
          <span>Location</span>
          <input type='text' value={location} name='location' onChange={onChange} required />
        </label>
        <label>
          <span>Skills</span>
          <input type='text' value={skills} name='skills' onChange={onChange} required />
        </label>
        <label>
          <span>About me</span>
          <textarea rows='4' cols='50' value={bio} name='bio' onChange={onChange} />
        </label>

        <label>
          <span>Youtube</span>
          <input type='text' value={youtube} name='youtube' onChange={onChange} />
        </label>
        <label>
          <span>Twitter</span>
          <input type='text' value={twitter} name='twitter' onChange={onChange} />
        </label>
        <label>
          <span>Instagram</span>
          <input type='text' value={instagram} name='instagram' onChange={onChange} />
        </label>
        <label>
          <span>Linkedin</span>
          <input type='text' value={linkedin} name='linkedin' onChange={onChange} />
        </label>
        <label>
          <span>Facebook</span>
          <input type='text' value={facebook} name='facebook' onChange={onChange} />
        </label>
        <input
          type='submit'
          className='btn'
          value={current?.status ? 'Apply changes' : 'Create profile'}
        />
      </form>
      <Link to='/dashboard' className='btn'>
        Go back
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  current: state.profiles.current,
});

export default connect(mapStateToProps, { getCurrentProfile, editProfile })(EditProfile);
