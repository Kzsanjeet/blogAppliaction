import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'

const SpecificBlog = () => {
    const [blog, setBlog] = useState(null)
    const {id} = useParams()
    
    const fetchBlog = async () => {
        try {
            const response = await fetch(`http://localhost:4000/blog/${id}`)
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