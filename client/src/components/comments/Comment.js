import { connect } from 'react-redux';

import { deleteComment } from '../../actions/posts';

import './Comment.scss';

const Comment = ({ comment, userId, deleteComment }) => {
  const handleOptionsDropdown = e => {
    e.stopPropagation();
    const dropdown = e.target.nextElementSibling;
    document.querySelectorAll('.comment__dropdown').forEach(drop => {
      if (drop !== dropdown) drop.hidden = true;
    });
    dropdown.hidden = !dropdown.hidden;
  };

  const handleDelete = commentId => {
    deleteComment(commentId);
  };

  return (
    <article className='comment'>
      <header className='comment__header'>
        <div className='comment__author'>
          <img className='comment__author__image' src={comment.user.avatar} alt='author profile' />
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
          <i className='fas fa-ellipsis-v' onClick={handleOptionsDropdown}></i>
          <ul hidden className='comment__dropdown'>
            {userId === comment.user._id && (
              <>
                <li className='comment__option delete'>
                  <i className='fas fa-edit'></i>
                  <p>Edit</p>
                </li>
                <li onClick={() => handleDelete(comment._id)} className='comment__option delete'>
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
  );
};

const mapStateToProps = state => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
