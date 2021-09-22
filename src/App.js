import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll } from './services/blogs'
import { loginUser } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
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
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={logInUser}>
          <p>username <input value={username} onChange={e => setUsername(e.target.value)} /></p>
          <p>password <input value={password} onChange={e => setPassword(e.target.value)} type="password"/></p>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={logout}>Log out</button>
        {blogs.map(blog =>
          (blog.user && blog.user.username === user.username) &&
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App