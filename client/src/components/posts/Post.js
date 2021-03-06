import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Post.scss';
import { deletePost, updateLikes } from '../../actions/posts';

const Post = ({ commentsCTA, userId, post, deletePost, updateLikes }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(-1);
  useEffect(() => {
    for (let [i, { user }] of post?.likes.users.entries()) {
      if (user === userId) {
        setIsLikedByUser(i);
        break;
      }
    }
  }, [post, userId]);

  const history = useHistory();

  const handleLike = () => {
    updateLikes(post._id, userId, isLikedByUser);
    setIsLikedByUser(isLikedByUser === -1 ? post.likes.count : -1);
  };

  const likeIcon = 'far fa-thumbs-up' + (isLikedByUser > -1 ? ' liked' : '');
  if (!post.user) return null;
  if (Object.keys(post.user).length === 0) return null;
  return (
    <div className='post'>
      <header>
        <img src={post.user.avatar} alt={`${post.user.name} profile`} />
        <p>{post.user.name}</p>
      </header>
      <p>{post.text}</p>
      <div className='buttons'>
        <div className='left'>
          {commentsCTA && (
            <div className='comments'>
              <button className='btn' onClick={() => history.push(`/post/${post._id}`)}>
                Comment
              </button>
              <aside className='comments__count'>
                {post.comments.length} comment{post.comments.length === 1 ? '' : 's'}
              </aside>
            </div>
          )}
          <div className='likes'>
            <i className={likeIcon} onClick={handleLike}></i>
            <span className='likes__count'>
              {post.likes.count} {post.likes.count === 1 ? 'developer likes' : 'developers like'}{' '}
              this
            </span>
          </div>
        </div>
        {userId === post.user._id && (
          <button onClick={() => deletePost(post._id)} className='btn btn-red'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { deletePost, updateLikes })(Post);
