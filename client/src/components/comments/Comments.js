import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Post from '../posts/Post';
import { getPost, addComment } from '../../actions/posts';

const Comments = ({ match, post, userId, getPost, addComment }) => {
  const { postId } = match.params;
  const [comment, setComment] = useState('');
  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  if (!post) return null;

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, comment);
    setComment('');
  };
  const handlePress = e => {
    if (e.key === 'Enter' && e.nativeEvent.metaKey) {
      handleSubmit(e);
    }
  };
  return (
    <div className='container my-5'>
      <Post post={post} key={postId} commentsCTA={false} />
      <section id='comments'>
        <h2>Leave a comment</h2>
        <form onKeyDownCapture={handlePress} onSubmit={handleSubmit}>
          <textarea
            name='comment'
            rows='5'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button className='btn'>Submit</button>
        </form>
        <h2>Comments:</h2>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.posts.current,
  userId: state.auth.user?._id,
});

export default connect(mapStateToProps, { getPost, addComment })(Comments);
