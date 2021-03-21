import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const [data, setData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: Date.now(),
    current: false,
    description: '',
  });

  const { title, company, location, from, to, current, description } = data;
  const history = useHistory();
  const onSubmit = e => {
    e.preventDefault();
    try {
      addExperience(data);
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div className='container'>
      <h2>Add an experience:</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span>Title</span>
          <input type='text' name='title' value={title} onChange={onChange} required />
        </label>
        <label>
          <span>Company</span>
          <input type='text' name='company' value={company} onChange={onChange} required />
        </label>
        <label>
          <span>Location</span>
          <input type='text' name='location' value={location} onChange={onChange} />
        </label>
        <label>
          <span>From</span>
          <input type='date' name='from' value={from} onChange={onChange} required />
        </label>
        <label>
          <span>To</span>
          <input type='date' name='to' value={to} onChange={onChange} disabled={current} />
        </label>
        <label>
          <span>Current</span>
          <input
            type='checkbox'
            name='current'
            defaultChecked={current}
            onChange={() => setData({ ...data, current: !current })}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea type='text' name='description' value={description} onChange={onChange} />
        </label>
        <input type='submit' className='btn' value='Add experience' />
      </form>
      <Link to='/dashboard' className='btn btn-red'>
        Cancel
      </Link>
    </div>
  );
};

export default connect(null, { addExperience })(AddExperience);
