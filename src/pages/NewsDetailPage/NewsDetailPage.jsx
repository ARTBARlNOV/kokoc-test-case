import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchStoryDetail } from '../../actions/newsDetailAction';
import Comment from '../../components/Comment/Comment';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { story, comments, loading, error } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchStoryDetail(id));
  }, [dispatch, id]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchStoryDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchStoryDetail(id));
    }, 60000); 
  
    return () => clearInterval(interval);
  }, [dispatch]);

  const formattedDate = useMemo(() => {
    return story ? new Date(story.time * 1000).toLocaleDateString() : '';
  }, [story]);
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!story) return <div>Новость не найдена.</div>;

  return (
    <div className="news-detail-container">
      <h2 className="news-detail-title">{story.title}</h2>
      <a href={story.url} target="_blank" rel="noopener noreferrer" className="news-detail-link">Читать полностью</a>
      <div className="news-detail-meta">Автор: {story.by} | Дата публикации: {formattedDate}</div>
      <div className="news-detail-meta">Количество комментариев: {story.descendants}</div>
      <Link to="/" className="news-detail-back-link">Вернуться к списку новостей</Link>
      <button onClick={handleRefresh} className="news-detail-refresh-button">Обновить</button>
      <h3 className="news-detail-comments-title">Комментарии:</h3>
      <ul className="comment-list">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      </ul>
    </div>
  );
};

export default NewsDetailPage;
