import { useState, useEffect } from 'react'
import userServices from '../services/users'
import { useParams } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)
  useEffect(() => {
    userServices.getOne(id).then(initialUsers => {
      setUser(initialUsers)
    })
  })
  if (user) {
    const blogs = user.blogs
    return (
      <>
        <h1>{user.username}</h1>
        <h4>Added blogs</h4>
        <ListGroup>
          {blogs.map(blog => <ListGroupItem variant='primary' key={blog.id} >{blog.title}</ListGroupItem>)}
        </ListGroup>
      </>
    )
  } else {
    return (
      <h1>loading</h1>
    )
  }
}

export default User