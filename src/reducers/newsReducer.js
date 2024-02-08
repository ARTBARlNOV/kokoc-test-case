import {
  FETCH_COMMENTS_SUCCESS, FETCH_STORY_BEGIN, FETCH_STORY_FAILURE, FETCH_STORY_SUCCESS,
} from '../types/storyTypes';

const initialState = {
  story: null,
  comments: [],
  loading: false,
  error: null,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        story: action.payload.story,
      };

    case FETCH_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        story: null,
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments,
      };

    default:
      return state;
  }
}
