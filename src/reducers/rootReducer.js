import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import newsListReducer from './newsListReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  newsList: newsListReducer,
  news: newsReducer,
  comments: commentReducer,
});

export default rootReducer;
