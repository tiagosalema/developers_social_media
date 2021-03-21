import { useState } from 'react';
import { connect } from 'react-redux';

import { createPost } from '../../actions/posts';

const CreatePost = ({ createPost }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createPost(text);
    setText('');
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        name='text'
        cols='30'
        required
        rows='10'
        value={text}
        onChange={({ target }) => setText(target.value)}
      ></textarea>
      <button className='btn' type='submit'>
        Create post
      </button>
    </form>
  );
};

export default connect(null, { createPost })(CreatePost);
