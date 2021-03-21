import React from 'react';
import { connect } from 'react-redux';

import './Post.scss';
import { deletePost } from '../../actions/posts';

const Post = ({ post, deletePost }) => {
  return (
    <div className='post'>
      <header>
        <img src={post.user.avatar} alt={`${post.user.name} profile`} />
        <p>{post.user.name}</p>
      </header>
      <p>{post.text}</p>
      <div className='buttons'>
        <div className='left'>
          <div className='comments'>
            <button className='btn'>Comment</button>
            <aside className='comments__count'>10 comments</aside>
          </div>
          <div className='likes'>
            <i class='far fa-thumbs-up'></i>
            <i class='fas fa-thumbs-up'></i>
            <span className='likes__count'>15 developers like this</span>
          </div>
        </div>
        <button onClick={() => deletePost(post._id)} className='btn btn-red'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deletePost })(Post);
