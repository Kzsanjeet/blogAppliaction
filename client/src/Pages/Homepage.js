import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import './Homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId,setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);




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
        setUserInfo(data.user);
      }
      // console.log(data.user._id)
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
  // console.log(allBlogs)

  useEffect(() => {
    getAllBlog();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/del-blog/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          getAllBlog();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const redirectPage = (id) => {
    window.location.href = `specific-blog/${id}`;
  }
  // console.log(userInfo)

  return (
    <div>
      <Navbar />
      <div className='main-container'>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <div class="blog-list">
            <div class="blog-item">
              <div class="user-data">
              Welcome,<p class="info"> {userInfo.firstname} {userInfo.lastname}</p>
              </div>
              <h3>Sort by : Recently added</h3>
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
                          <Link to={`/edit-blog/${blog._id}`}>
                            <button class="edit-btn">
                                Edit
                              </button>
                            </Link>
                        <button class="delete-btn" onClick={()=>deletePost(blog._id)}>Delete</button>
                      </div>
                    ):null}
                    <p className='summary'> {blog.blogSummary}</p>
                    <button  className='see-more-btn' onClick={()=>redirectPage(blog._id)}>See More</button>
                   
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
