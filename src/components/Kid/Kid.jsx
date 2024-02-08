import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCommentDetails } from '../../actions/commentsAction';
import './Kid.css'

const Kid = ({ kidId }) => {
  const dispatch = useDispatch();
  const kid = useSelector(state => state.comments.commentsById[kidId]);

  useEffect(() => {
    if (!kid) {
      dispatch(loadCommentDetails(kidId));
    }
  }, [kidId, dispatch, kid]);

  if (!kid) return <div>Loading...</div>; 

  return (
    <div className="comment-container">
      <div className="comment-author">{kid.by}</div>
      <div className="comment-text" dangerouslySetInnerHTML={{ __html: kid.text }}></div>
    </div>
  );
};

export default Kid;
