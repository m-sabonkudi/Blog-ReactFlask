import React from 'react';
import Header from '../components/Header';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';


function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header text="Our Latest Blogs" />
      <Blogs />
      <Footer />
    </div>
  )
}

export default App