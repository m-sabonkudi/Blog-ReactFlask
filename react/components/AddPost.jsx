import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackButton from './BacktoBlogsBtn';

function AddPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    content: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch('/api/add-blog', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Blog posted!');
        navigate('/');
      } else {
        setMessage(`❌ ${result.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setMessage('❌ Upload failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header text="Create New Blog Post" />

      <main className="container mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6" encType="multipart/form-data">
          <BackButton />
          {message && <p className="text-sm font-medium text-center text-red-500">{message}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <input
              type="text"
              name="summary"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              rows="10"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Publish Post
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default AddPost;
