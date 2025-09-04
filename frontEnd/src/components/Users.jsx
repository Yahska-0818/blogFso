import { Link } from 'react-router-dom'
import userServices from '../services/users'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table' // <-- ADD THIS LINE

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userServices.getAll().then(initialUsers => {
      setUsers(initialUsers)
    })
  }, [])
  return (
    <>
      <h1>Users</h1>
      <Table striped variant='dark'> 
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users