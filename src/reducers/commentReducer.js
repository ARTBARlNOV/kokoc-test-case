import { FETCH_COMMENT_BEGIN, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE } from '../types/commentTypes';

const initialState = {
  commentsById: {},
  loading: false,
  error: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [action.payload.commentId]: action.payload.comment,
        },
        loading: false,
        error: null,
      };

    case FETCH_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        comments: {
          ...state.commentsById,
          [action.payload.commentId]: { error: action.payload.error },
        },
      };

    default:
      return state;
  }
}
