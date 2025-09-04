import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const loggedInStlye = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
  }

  const buttonStyle = {
    height: '25px'
  }
  return (
    <div style={loggedInStlye}>
      <p>Logged in with {user.username}</p>
      <button type="button" onClick={() => dispatch(logOutUser())} style={buttonStyle}>Logout</button>
    </div>
  )
}

export default Header