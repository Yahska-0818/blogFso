import { useDispatch } from "react-redux"
import { handleLogin } from "../reducers/userReducer"

const Login = ({username,password,setPassword,setUsername }) => {
  const dispatch = useDispatch()
  return (
    <form onSubmit={(event)=>{
      event.preventDefault()
      dispatch(handleLogin(username,password))
      setUsername('')
      setPassword('')
    }}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login