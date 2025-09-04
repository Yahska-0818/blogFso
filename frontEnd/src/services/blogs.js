import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.get(baseUrl,config)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject,config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.get(`${baseUrl}/${id}`,config)
  return request.data
}

const commentBlog = async(id,content) => {
  const config = {
    headers: {Authorization: token}
  }
  const request = await axios.post(`${baseUrl}/${id}/comments`,{content:content},config)
  return request.data
}

export default { getAll, setToken, create, addLike, remove, getOne, commentBlog }