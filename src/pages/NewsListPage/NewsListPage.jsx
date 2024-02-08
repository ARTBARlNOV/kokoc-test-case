import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList } from '../../actions/newsListAction';
import './NewsListPage.css';
import NewsItem from '../../components/NewsItem/NewsItem';

function NewsListPage() {
  const dispatch = useDispatch();
  const { newsList, loading, error } = useSelector((state) => state.newsList);

  useEffect(() => {
    dispatch(fetchNewsList());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchNewsList());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRefreshClick = useCallback(() => {
    dispatch(fetchNewsList());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) {
    return (
      <div>
        Ошибка при загрузке списка новостей:
        {error.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  return (
    <div className="news-list-container">
      <h1 className="news-list-title">Список новостей</h1>
      <button type="button" onClick={handleRefreshClick} className="refresh-button">Обновить список новостей</button>
      <ul className="news-list">
        {newsList?.map((newsItem) => (
          <NewsItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </ul>
    </div>
  );
}

export default NewsListPage;
