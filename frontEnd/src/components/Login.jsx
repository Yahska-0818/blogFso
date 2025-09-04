import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'
import { useState } from 'react'
import { Button,Form } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form onSubmit={(event) => {
      event.preventDefault()
      dispatch(handleLogin(username,password))
      setUsername('')
      setPassword('')
    }} style={{padding:"2vh",borderRadius:"1vh",display:"flex",flexDirection:"column",gap:"2vh"}}>
      <Form.Group>
        <Form.Label style={{color:"white"}}>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label style={{color:"white"}}>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button varian="primary" type="submit">login</Button>
    </Form>
  )
}

export default Login