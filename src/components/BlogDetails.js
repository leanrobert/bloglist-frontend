import React from 'react'

const BlogDetails = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <p>{blog.url}</p>
            <p>likes {blog.likes}<button>Like</button></p>
            <p>{blog.author}</p>
        </div>
    )
}

export default BlogDetails
