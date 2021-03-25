import { useState } from 'react';

import { connect } from 'react-redux';

import { editComment, deleteComment } from '../../actions/posts';

import './Comment.scss';

const Comment = ({ comment, userId, editComment, deleteComment }) => {
  const [text, setText] = useState(comment.text);
  const handleOptionsDropdown = e => {
    e.stopPropagation();
    const dropdown = e.target.nextElementSibling;
    document.querySelectorAll('.comment__dropdown').forEach(drop => {
      if (drop !== dropdown) drop.hidden = true;
    });
    dropdown.hidden = !dropdown.hidden;
  };
  const handleEdit = e => {
    let header = e.target;
    while (header.tagName !== 'HEADER') {
      header = header.parentElement;
    }
    header.nextSibling.classList.toggle('show');
    header.nextSibling.nextSibling.classList.toggle('show');
  };
  const handleEditSubmit = commentId => {
    editComment(commentId, text);
    // editComment(comment._id, text)
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
                <li onClick={handleEdit} className='comment__option delete'>
                  <i className='fas fa-edit'></i>
                  <p>Edit</p>
                </li>
                <li onClick={() => deleteComment(comment._id)} className='comment__option delete'>
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
      <form className='comment__edit show' onSubmit={() => handleEditSubmit(comment._id)}>
        <input type='text' value={text} onChange={e => setText(e.target.value)} />
        <button className='btn btn-sm'>Submit</button>
      </form>
      <p className='comment__text'>{comment.text}</p>
      {/* <p className='comment__text'>{comment._id}</p> */}
    </article>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { editComment, deleteComment })(Comment);
