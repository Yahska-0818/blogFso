import { useState, useEffect } from "react"
import userServices from '../services/users'
import { useParams } from "react-router-dom"

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)
  useEffect(() => {
    userServices.getOne(id).then(initialUsers => {
      setUser(initialUsers)
    })
  }, [])
  if (user) {
    const blogs = user.blogs
    return (
      <>
        <h1>{user.username}</h1>
        <h4>added blogs</h4>
        <ul>
          {blogs.map(blog => <li key={blog.id} >{blog.title}</li>)}
        </ul>
      </>
    )
  } else {
    return (
      <h1>loading</h1>
    )
  }
}

export default User