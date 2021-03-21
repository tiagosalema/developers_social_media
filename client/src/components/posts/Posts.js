import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/posts';
import CreatePost from './CreatePost';
import Post from './Post';

const Posts = ({ getPosts, posts }) => {
  useEffect(getPosts, [getPosts]);

  return (
    <div className='container'>
      <CreatePost />
      {posts?.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.all,
});

export default connect(mapStateToProps, { getPosts })(Posts);
