import { useSelector } from 'react-redux'

const Notification = (state) => {
  // console.log(state.noti)
  const notification = useSelector(state => state.noti)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {
        notification === '' ? null : <p>{notification}</p>
      }
    </div>
  )
}

export default Notification