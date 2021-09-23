import React from 'react'

const BlogDetails = ({ blog, updatedLikesBlog }) => {
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

    return (
        <div style={blogStyle}>
            <p>{blog.url}</p>
            <p>likes {blog.likes}<button onClick={updateBlog}>Like</button></p>
            <p>{blog.author}</p>
        </div>
    )
}

export default BlogDetails
