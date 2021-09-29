import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createBlog, getAll, updateLikesBlog, deleteBlog } from './services/blogs'
import { loginUser } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : (a.likes < b.likes) ? 1 : 0)

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('user')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
    }
  }, [])

  const logInUser = async (e) => {
    e.preventDefault()

    try {
      const user = await loginUser({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exeption) {
      console.log('wrong credentials', exeption)
      setError('wrong username or password')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleSubmit = (newBlog) => {
    const returnedBlog = createBlog(newBlog.title, newBlog.author, newBlog.url, user.token)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`Blog ${returnedBlog.title} added`)
  }

  const updateLikeBlog = (newBlog) => {
    const updatedBlog = updateLikesBlog(newBlog)
    setMessage(`Blog ${updatedBlog.title} updated`)
  }

  const handleDelete = (title, id) => {
    if(window.confirm(`Remove blog ${title} ?`)) {
      deleteBlog(id, user.token)
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        {error && <h2 className="error">{error}</h2>}
        <form onSubmit={logInUser}>
          <p>username <input id="username" value={username} onChange={e => setUsername(e.target.value)} /></p>
          <p>password <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password"/></p>
          <button id="login-button" type="submit">log in</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {error && <h2 className="message">{message}</h2>}
        <p>{user.username} logged in</p>
        <button onClick={logout}>Log out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlogFun={handleSubmit} />
        </Togglable>
        {sortedBlogs.map(blog =>
          (blog.user && blog.user.username === user.username) &&
            <div key={blog.id} className="blog">
              <Blog blog={blog} />
              <Togglable buttonLabel="View" ref={blogFormRef}>
                <BlogDetails blog={blog} updatedLikesBlog={updateLikeBlog} deleteBlogById={handleDelete} />
              </Togglable>
            </div>
        )}
      </div>
    )
  }
}

export default App