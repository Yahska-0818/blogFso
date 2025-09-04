import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div style={{color:"white"}}>
      {notification}
    </div>
  )
}

export default Notification