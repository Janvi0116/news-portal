import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews, resetArticles, setFilters } from '../redux/newsSlice';
import { clearFetchedPages } from '../redux/uiSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilterSubmit = () => {
    // TODO : Maybe we can dispatch only one action from here as well 
    // But this makes clear the logical differnt things we wanna do on filters change
    dispatch(resetArticles());
    dispatch(clearFetchedPages());
    dispatch(setFilters({ searchInput: searchQuery, newsCategory: selectedCategory }));
    dispatch(fetchNews({ page: 1 }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-2/5">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full md:w-2/5">
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select category...</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className="w-full md:w-1/5 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            onClick={handleFilterSubmit}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
