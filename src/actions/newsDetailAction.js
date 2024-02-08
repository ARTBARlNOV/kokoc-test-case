import {
  FETCH_COMMENTS_SUCCESS, FETCH_STORY_BEGIN, FETCH_STORY_FAILURE, FETCH_STORY_SUCCESS,
} from '../types/storyTypes';

export const fetchStoryBegin = () => ({
  type: FETCH_STORY_BEGIN,
});

export const fetchStorySuccess = (story) => ({
  type: FETCH_STORY_SUCCESS,
  payload: { story },
});

export const fetchStoryFailure = (error) => ({
  type: FETCH_STORY_FAILURE,
  payload: { error },
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments },
});

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const fetchComments = (commentIds, dispatch) => {
  const commentsPromises = commentIds.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(handleErrors).then((res) => res.json()));
  Promise.all(commentsPromises)
    .then((comments) => {
      dispatch(fetchCommentsSuccess(comments));
    });
};

export const fetchStoryDetail = (storyId) => (dispatch) => {
  dispatch(fetchStoryBegin());
  fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
    .then(handleErrors)
    .then((res) => res.json())
    .then((story) => {
      dispatch(fetchStorySuccess(story));
      if (story?.kids && story?.kids.length > 0) {
        fetchComments(story?.kids, dispatch);
      }
    })
    .catch((error) => dispatch(fetchStoryFailure(error)));
};
