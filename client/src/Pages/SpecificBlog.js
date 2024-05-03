import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'

const SpecificBlog = () => {
    const [blog, setBlog] = useState(null)
    const blogId = useParams()
    console.log(blogId.id)
    
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
            setBlog(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlog()
    }, [])

    console.log(blog)

  return (
    <div>
        <Navbar/>
        SpecificBlog
        </div>
  )
}

export default SpecificBlog