import { FETCH_NEWS_LIST_BEGIN, FETCH_NEWS_LIST_FAILURE, FETCH_NEWS_LIST_SUCCESS } from "../types/newsListTypes";

export const fetchNewsListBegin = () => ({
  type: FETCH_NEWS_LIST_BEGIN,
});

export const fetchNewsListSuccess = newsList => ({
  type: FETCH_NEWS_LIST_SUCCESS,
  payload: { newsList },
});

export const fetchNewsListFailure = error => ({
  type: FETCH_NEWS_LIST_FAILURE,
  payload: { error },
});

export const fetchNewsList = () => {
  return dispatch => {
    dispatch(fetchNewsListBegin());
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then(res => res.json())
      .then(ids => {
        const topIds = ids.slice(0, 100);
        const newsPromises = topIds.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json())
        );
        Promise.all(newsPromises)
          .then(newsItems => {
            const sortedNewsItems = newsItems
              .filter(item => item)
              .sort((a, b) => b.time - a.time);
            dispatch(fetchNewsListSuccess(sortedNewsItems));
          })
          .catch(error => dispatch(fetchNewsListFailure(error)));
      });
  };
};

