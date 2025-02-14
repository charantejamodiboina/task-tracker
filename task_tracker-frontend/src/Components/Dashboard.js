import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Components.css'
import { useAuth } from './user/Auth' 
function Dashboard() {
  const [counts, setCounts] = useState('')
  const [error, setError] = useState(null)
  const {token} = useAuth()

  useEffect(() => {
    
    let url = 'http://127.0.0.1:8000/count'
    axios.get(url, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }
  )
    
    .then(res  => {
      console.log(res, token)
      setCounts(res.data)
    }).catch(error => {
      setError('unauthorized. Please login to view the data')
    })
  }, [token])
  return (
    
    <div style={{margin:0}}>
      <h2>Dashboard</h2>
      {error? <p>{error}</p>:
    <ul className='count'>
      <li style={{backgroundColor : 'rgba(225, 0, 0, 0.6)'}}><h3>Overdue Tasks</h3><p>{counts.overdue? counts.overdue : 0}</p></li>
      <li style={{backgroundColor : 'rgba(255, 0, 0, 0.3)'}}><h3>Pending Tasks</h3><p>{counts.pending? counts.pending : 0}</p></li>
      <li style={{backgroundColor : 'rgba(255, 255, 0, 0.3)'}}><h3>Working Tasks</h3><p>{counts.working? counts.working : 0}</p></li>
      <li style={{backgroundColor : 'rgba(154, 205, 50, 0.3)'}}><h3>Testing Tasks</h3><p>{counts.testing? counts.testing : 0}</p></li>
      <li style={{backgroundColor : 'rgba(0, 255, 0, 0.3)'}}><h3>Completed Tasks</h3><p>{counts.completed? counts.completed : 0 }</p></li>
      <li style={{backgroundColor : 'rgba(0, 0, 255, 0.3)'}}><h3>All Tasks</h3><p>{counts.all? counts.all : 0 }</p></li>
    </ul>}
    </div>
  )
}

export default Dashboard