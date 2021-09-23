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

export { getAll, createBlog }