import React, { useState } from 'react'

const BlogForm = ({ createBlogFun }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    createBlogFun({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} id='form'>
      <h1>create new</h1>
      <p>title: <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} id='title' /></p>
      <p>author: <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} id='author' /></p>
      <p>url: <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} id='url'/></p>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
