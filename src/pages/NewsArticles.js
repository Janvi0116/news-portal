import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setPage } from '../redux/newsSlice';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-image.png';

const NewsArticles = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, totalResults, page } = useSelector((state) => state.news);
  const fetchedPages = useSelector((state) => state.ui.fetchedPages);

  useEffect(() => {
    dispatch(fetchNews({}));
  }, [dispatch]);

  const handlePaginationPageChange = (newPage) => {
    if (!fetchedPages.includes(newPage)) {
      dispatch(fetchNews({ page: newPage }));
    } else {
      dispatch(setPage(newPage));
    }
  };

  let articlesToRender = articles[page] || [];
  

  return (
    <div className="container mx-auto p-4">
      <Filters />
      <main>
        {loading && <Loader/>}
        {error && <Error error = {error}/>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articlesToRender.map((article, index) => (
            <Link key={index} to={`/article/${encodeURIComponent(article.title)}`}>
              <div key={index} className="border rounded overflow-hidden shadow-lg flex flex-col h-full">
                <img
                  src={article.urlToImage || defaultImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  {article.description ? (
                    <p className="text-gray-700 flex-grow">{article.description}</p>
                  ) : (
                    <p className="text-gray-700 italic flex-grow">No description available.</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {totalResults > 10 && (
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            pageSize={10}
            onPageChange={handlePaginationPageChange}
          />
        )}
      </main>
    </div>
  );
};

export default NewsArticles;
