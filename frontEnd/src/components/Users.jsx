import { Link } from 'react-router-dom'
import userServices from '../services/users'
import { useState, useEffect } from 'react'

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
      <table>
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
      </table>
    </>
  )
}

export default Users