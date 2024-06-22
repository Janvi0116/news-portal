import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const articles = useSelector((state) => state.news.articles);
  const article = articles.find((article) => article.title === articleId); // Assuming title is unique or use a unique identifier
  const navigate = useNavigate();
  
  // Redirect to homepage if article is not found which would always be the case if the person
  // opens the url directly since there is no actual unique id in articles and no way to fetch that from api
  useEffect(() => {
    if (!article) {
      navigate("/");
      return;
    }
  },[navigate,article])

  const { title, description, author, publishedAt, urlToImage, url, content } = article || {};

  // content was always ending with something like "+ [6373] chars" . This is done to remove that
  const cleanContent = content ? content.replace(/\[\+\d+ chars\]/, '') : "";

  return (
    <div className="container mx-auto p-4">
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <img src={urlToImage} alt={title} className="w-full h-auto mb-4 rounded-lg" />
        <p className="text-gray-600 mb-2">{description}</p>
        {author && <p className="text-gray-500 mb-2">Author : {author}</p>}
        {publishedAt && <p className="text-gray-500 mb-2">Published At : {publishedAt}</p> }
        <p className="text-gray-700 leading-relaxed mb-4">{cleanContent}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Read more
        </a>
      </article>
    </div>
  );
};

export default ArticleDetail;
