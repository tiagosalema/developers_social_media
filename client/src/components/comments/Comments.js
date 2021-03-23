import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Post from '../posts/Post';
import { getPost, addComment, getPostComments } from '../../actions/posts';

import './Comments.scss';

const Comments = ({ match, post, userId, getPost, addComment, getPostComments }) => {
  const { postId } = match.params;

  const [comment, setComment] = useState('');

  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  useEffect(() => getPostComments(postId), [getPostComments, postId]);

  useEffect(() => {
    const closeOptionDropdowns = () => {
      document.querySelectorAll('.comment__dropdown').forEach(drop => (drop.hidden = true));
      console.log(document.querySelectorAll('.comment__dropdown'));
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

  const handleOptionsDropdown = e => {
    e.stopPropagation();
    const dropdown = e.target.nextElementSibling;
    document.querySelectorAll('.comment__dropdown').forEach(drop => {
      if (drop !== dropdown) drop.hidden = true;
    });
    dropdown.hidden = !dropdown.hidden;
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
        <h2>Comments</h2>
        {post.comments.map(comment => (
          <article key={comment._id} className='comment'>
            <header className='comment__header'>
              <div className='comment__author'>
                <img
                  className='comment__author__image'
                  src={comment.user.avatar}
                  alt='author profile'
                />
                <p className='comment__author__name'>{comment.user.name}</p>
              </div>
              <p className='comment__date'>
                {new Intl.DateTimeFormat().format(new Date(comment.date))}
                {' at '}
                {new Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric' }).format(
                  new Date(comment.date),
                )}
              </p>
              <div className='comment__options'>
                <i className='fas fa-ellipsis-h' onClick={handleOptionsDropdown}></i>
                <ul hidden className='comment__dropdown'>
                  {userId === comment.user._id && (
                    <>
                      <li className='comment__option delete'>
                        <i className='fas fa-edit'></i>
                        <p>Edit</p>
                      </li>
                      <li className='comment__option delete'>
                        <i className='fas fa-trash-alt'></i>
                        <p>Delete</p>
                      </li>
                    </>
                  )}
                  <li className='comment__option'>
                    <i className='fas fa-share-alt'></i>
                    <p>Share</p>
                  </li>
                  <li className='comment__option report'>
                    <i className='fas fa-flag'></i>
                    <p>Report</p>
                  </li>
                </ul>
              </div>
            </header>
            <p className='comment__text'>{comment.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.posts.current,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { getPost, addComment, getPostComments })(Comments);
