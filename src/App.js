import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsArticles from './pages/NewsArticles';
import ArticleDetail from './pages/ArticleDetail';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/article/:articleId" element={<ArticleDetail />} />
          <Route path="/" element={<NewsArticles />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
