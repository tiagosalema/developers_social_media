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
      {posts[0]?._id && posts.map(post => <Post post={post} key={post._id} commentsCTA={true} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
