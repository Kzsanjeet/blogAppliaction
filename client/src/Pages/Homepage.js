import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import './Homepage.css';

function Homepage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId,setUserId] = useState(null);




  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('blogUserToken')}`,
        },
      });
  
      const data = await response.json();
      if(data.success){
        
        setUserId(data.user._id);
      }
      console.log(data.user._id)
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserInfo();
  },[]);


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
          <div class="blog-list">
            <div class="blog-item">
              <h2>All Blogs</h2>
              <ul>
                {allBlogs && allBlogs.map((blog, index) => (
                  <li key={index} class="blog-card">
                    <div class="blog-header">
                      <h3>{blog.blogTitle}</h3>
                      <div class="author-info">
                        <p>{blog.user.firstname} {blog.user.lastname}</p>
                        <p> {blog.user.email}</p>
                      </div>
                    </div>
                    {allBlogs && blog.user._id === userId ? (
                      <div class="blog-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                      </div>
                    ):null}
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
