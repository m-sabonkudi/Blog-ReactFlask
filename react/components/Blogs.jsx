import React, { useEffect, useState } from 'react';
import Card from './Card';
import { data, useNavigate } from 'react-router-dom';

function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(
        data => {
          setBlogs(data);
          setLoading(false);
          console.log('data', data)
        }
      );
  }, []);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  




  return (
    <main className="container mx-auto px-4 py-10 flex-grow">
        <button onClick={() => navigate('/add')}  className="px-4 mb-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
            Add Post
        </button>
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog_post, index) => (
                <Card
                key={index}
                url={blog_post.url}
                title={blog_post.title}
                author={blog_post.author}
                date={blog_post.date}
                summary={blog_post.summary}
                slug={blog_post.slug}
            />
            ))}
        </div>
    </main>
  )
}

export default Blogs