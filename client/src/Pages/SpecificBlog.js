import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import './SpecificBlog.css'

const SpecificBlog = () => {
    const [blog, setBlog] = useState(null)
    const blogId = useParams()

    const token = localStorage.getItem('blogUserToken')
    
    const fetchBlog = async () => {
        try {
            const response = await fetch(`http://localhost:4000/blog/${blogId.id}`,{
                method: 'GET',
                headers: {
              'Content-Type': 'application/json',
            }
         
        },
            )
            const data = await response.json()
            if(data.success){
                setBlog(data.details)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlog()
    }, [])



    //for deleting post
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
              SpecificBlog()
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    


  return (
    <div>
        <Navbar/>
        {blog ? (
            <div class="blog-container">
                <div class="user-info">
                    <div>
                        <p class="firstname">{blog?.user?.firstname} {blog?.user?.lastname}</p>
                        <p class="email">{blog?.user?.email}</p>
                    </div>
                   {token && 
                    <div>
                        <Link to={`/edit-blog/${blog._id}`}>
                                <button class="edit-btn">
                                    Edit
                                </button>
                        </Link>
                        <button class="delete-btn" onClick={()=>deletePost(blog._id)}>Delete</button>
                    </div>
                }
                </div>
                <div class="blog-details">
                    <h1 class="blog-title">{blog?.blogTitle}</h1>
                    <p class="blog-summary">{blog?.blogSummary}</p>
                    <p class="blog-content">{blog?.blogContent}</p>
                </div>
            </div>
        ):(
            <p>No blog found..</p>
        )}

    </div>
  )
}

export default SpecificBlog