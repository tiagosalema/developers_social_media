import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import Comment from '../comments/Comment';
import { getPost, addComment, getComments } from '../../actions/posts';

const PostWithComments = ({ match, post, getPost, addComment, getComments }) => {
  const { postId } = match.params;

  const [comment, setComment] = useState('');

  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  useEffect(() => getComments(postId), [getComments, postId]);

  useEffect(() => {
    const closeOptionDropdowns = () => {
      document.querySelectorAll('.comment__dropdown').forEach(drop => (drop.hidden = true));
    };
    document.addEventListener('click', closeOptionDropdowns);
    return () => document.removeEventListener('click', closeOptionDropdowns);
  }, []);

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
        {post._id ? (
          <>
            <h2>Leave a comment</h2>
            <form onKeyDownCapture={handlePress} onSubmit={handleSubmit}>
              <textarea
                required
                name='comment'
                rows='5'
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button className='btn'>Submit</button>
            </form>
          </>
        ) : (
          <p>This post has been archived.</p>
        )}
        <h2>Comments</h2>
        {post.comments.map(comment => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = state => ({ post: state.posts[0] });

export default connect(mapStateToProps, { getPost, addComment, getComments })(PostWithComments);
