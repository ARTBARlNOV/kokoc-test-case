import { FETCH_COMMENT_BEGIN, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE } from '../types/commentTypes';

export const fetchCommentBegin = () => ({
  type: FETCH_COMMENT_BEGIN,
});

export const fetchCommentSuccess = (commentId, comment) => ({
  type: FETCH_COMMENT_SUCCESS,
  payload: { commentId, comment },
});

export const fetchCommentFailure = (commentId, error) => ({
  type: FETCH_COMMENT_FAILURE,
  payload: { commentId, error },
});

export const loadCommentDetails = (commentId) => (dispatch) => {
  dispatch(fetchCommentBegin());
  fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchCommentSuccess(commentId, data));
    })
    .catch((error) => {
      dispatch(fetchCommentFailure(commentId, error.toString()));
    });
};
