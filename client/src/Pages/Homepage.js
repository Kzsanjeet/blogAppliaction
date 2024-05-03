import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function Homepage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/all-blog");
      const result = await response.json();
      if (result.success) {
        setAllBlogs(result.getBlogs); // Assuming result.data contains the array of blogs
        setLoading(false);
        
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allBlogs)

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <div>
            <h1>Welcome to yourThoughts</h1>
            <p>
              yourThoughts is a platform where you can share your thoughts with the world.
              You can create a blog, edit it, and delete it.
              You can also view other people's blogs and share your thoughts on them.
              yourThoughts is a platform where you can express yourself freely.
            </p>
            <div>
              <h2>All Blogs</h2>
              <ul>
                {allBlogs && allBlogs.map((blog, index) => (
                  <li key={index}>
                    <h3>{blog.blogTitle}</h3>
                    <p><strong>Summary:</strong> {blog.blogSummary}</p>
                    <p><strong>Description:</strong> {blog.blogContent}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
