import React from 'react'

const BlogDetails = ({ blog, updatedLikesBlog, deleteBlogById }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    const newBlog = {
      _id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updatedLikesBlog(newBlog)
  }

  const removeBlog = () => {
    deleteBlogById(blog.title, blog.id)
  }

  return (
    <div style={blogStyle}>
      <p>{blog.url} </p>
      <p>likes {blog.likes} <button onClick={updateBlog}>Like </button></p>
      <p>{blog.author} </p>
      <button onClick={removeBlog}>remove</button>
    </div>
  )
}

export default BlogDetails
