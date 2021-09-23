import React from 'react'

const BlogForm = ({ title, author, url, handleSubmit, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h1>create new</h1>
            <p>title: <input type="text" name="title" value={title} onChange={handleTitleChange} /></p>
            <p>author: <input type="text" name="author" value={author} onChange={handleAuthorChange} /></p>
            <p>url: <input type="text" name="url" value={url} onChange={handleUrlChange} /></p>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm
