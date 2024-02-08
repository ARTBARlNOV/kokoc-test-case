import React from 'react';
import { Link } from 'react-router-dom';
import './NewsItem.css';

const NewsItem = React.memo(({ newsItem }) => {
  const {
    time, id, title, score, by,
  } = newsItem;
  const formattedDate = new Date(time * 1000).toLocaleDateString();
  return (
    <li className="news-item">
      <Link to={`/news/${id}`} className="news-item-link">{title}</Link>
      <p className="news-item-details">
        Рейтинг:
        {score}
        , Автор:
        {by}
        , Дата:
        {formattedDate}
      </p>
    </li>
  );
});

export default NewsItem;
