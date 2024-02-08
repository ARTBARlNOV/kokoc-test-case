import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const NewsListPage = lazy(() => import('./pages/NewsListPage/NewsListPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage/NewsDetailPage'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<NewsListPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="*" element={<NewsListPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
