import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (title, author, url, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const request = await axios.post(baseUrl, { title, author, url }, config)
  return request.data
}

const updateLikesBlog = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog._id}`, blog)
  return request.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export { getAll, createBlog, updateLikesBlog, deleteBlog }