import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './Addblogpage.css'; 

const Addblogpage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      title: title,
      summary: summary,
      content: content
    };
    try {
      const response = await fetch('http://localhost:4000/add-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      const data = await response.json();
      console.log(data);
      alert('Blog added successfully');
      setTitle('');
      setSummary('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-blog-page">
        <div className="add-blog-container">
          <h1>Add Blog</h1>
          <form className="add-blog-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" className="input-field" value={title} onChange={handleTitleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input type="text" id="summary" className="input-field" value={summary} onChange={handleSummaryChange} />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea id="content" className="textarea-field" value={content} onChange={handleContentChange}></textarea>
            </div>
            <button type="submit" className="add-blog-btn">Add Blog</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addblogpage;
