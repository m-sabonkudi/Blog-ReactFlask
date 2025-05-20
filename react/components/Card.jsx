import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorDate from './AuthorDate';

function Card(props) {
  const navigate = useNavigate();

  function redirect() {
    navigate(`/post/${props.slug}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-sm hover:shadow-md transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 flex flex-col justify-between">
      <img
        src={`/photos/${props.url}`}
        alt="Blog Image"
        className="w-full h-36 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h2 className="text-base font-semibold mb-1">{props.title}</h2>
        <AuthorDate author={props.author} date={props.date} />
        
        <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3">{props.summary}</p>
      </div>



      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t dark:border-gray-700">
        <button onClick={redirect} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 font-medium">
          Read More
        </button>
      </div>
    </div>
  );
}

export default Card;
