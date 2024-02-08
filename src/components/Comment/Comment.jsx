import React, { useCallback, useState } from 'react';
import './Comment.css';
import { useDispatch } from 'react-redux';
import { loadCommentDetails } from '../../actions/commentsAction';
import Kid from '../Kid/Kid';

function Comment({ comment }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    if (!isOpen && comment.kids) {
      comment.kids.forEach((kidId) => {
        dispatch(loadCommentDetails(kidId));
      });
    }
    setIsOpen(!isOpen);
  }, [comment.kids, dispatch, isOpen]);

  if (!comment) return <div>Loading...</div>;

  return (
    <div className="comment-container">
      <div className="comment-author">{comment.by}</div>
      <div className="comment-text" dangerouslySetInnerHTML={{ __html: comment.text }} />
      {comment.kids && (
        <div className="comment-toggle" onClick={toggleOpen}>
          {isOpen ? 'Скрыть комментарии' : `Показать комментарии (${comment.kids.length})`}
        </div>
      )}
      {isOpen && comment.kids && (
        <div className="comment-children">
          {comment.kids.map((kidId) => (
            <Kid key={kidId} kidId={kidId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
