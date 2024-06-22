import React from 'react';

const Pagination = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pagesToRender = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesToRender.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      <nav>
        <ul className="inline-flex -space-x-px">
          {pagesToRender.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 border ${
                  page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                } hover:bg-blue-500 hover:text-white`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
