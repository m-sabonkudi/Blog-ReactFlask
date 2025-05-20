import React, { useEffect, useState } from 'react';
import AuthorDate from './AuthorDate';
import { useParams, useNavigate } from 'react-router-dom';
import blogs from '../src/blogs';
import BackButton from './BacktoBlogsBtn';
import Footer from './Footer';
import Header from './Header';


function Post() {
    const { slug } = useParams();
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


    async function deletePost(slug) {
      setLoading(true);
      try {
        const res = await fetch(`/api/delete-blog?slug=${slug}`, {method: "DELETE"});
        const result = await res.json();
  
        if (res.ok) {
          console.log('✅ Blog deleted!');
          navigate('/');
        } else {
          console.log(`❌ ${result.error || 'Something went wrong'}`);
        }
      } catch (err) {
        console.log('❌ Delete failed');
      } 
      setLoading(false) 
    } 

    if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        );
      }
      
      
    const currentIndex = blogs.findIndex(blog => blog.slug === slug);
    const blog = blogs[currentIndex];
  
    if (!blog) return <div className="text-center text-red-500">Blog not found.</div>;

    const nextPost = blogs[currentIndex - 1];
    const prevPost = blogs[currentIndex + 1];
  
  return (
    <div className='flex flex-col min-h-screen'>
        <Header text={blog.title} />
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <article>
        <img
          src={`/photos/${blog.url}`}
          alt="Blog featured"
          className="rounded-xl mb-6 w-full object-cover"
          style={{ height: '400px', width: '100%' }}
        />

        <h2 className="text-4xl font-bold leading-tight mb-4">{blog.title}</h2>

        <AuthorDate author={blog.author} date={blog.date} />

        <section className="prose prose-gray dark:prose-invert max-w-none">
          {blog.content}
        </section>
      </article>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        {prevPost && 
            (<button onClick={() => navigate(`/post/${prevPost.slug}`)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                ← Previous Post
            </button>)
        }

        {nextPost && (
            <button onClick={() => navigate(`/post/${nextPost.slug}`)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
            Next Post →
          </button>
        )}
        <BackButton />

        <button style={{backgroundColor: "red", color: "white"}} className="px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-700" onClick={() => {
          deletePost(blog.slug) 
        }}>Delete</button>


      </div>
    </main>
    <Footer />
    </div>
  );
}

export default Post;
