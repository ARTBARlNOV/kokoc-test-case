import { FETCH_NEWS_LIST_BEGIN, FETCH_NEWS_LIST_FAILURE, FETCH_NEWS_LIST_SUCCESS } from "../types/newsListTypes";

const initialState = {
  newsList: [],
  loading: false,
  error: null,
};

export default function newsListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_LIST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NEWS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        newsList: action.payload.newsList,
      };
    case FETCH_NEWS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        newsList: [],
      };
    default:
      return state;
  }
}
