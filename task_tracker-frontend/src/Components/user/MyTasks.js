import React, { useEffect, useState } from 'react'
import { useAuth } from './Auth'
import axios from 'axios'
// import ChangeAssign from './ChangeAssign'
import ChangeStatus from './ChangeStatus'
import ChangeAssign from './ChangeAssign'
// import '../Components.css'
function MyTasks() {
    const [myTasks, setMyTasks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeTaskId, setActiveTaskId] = useState(null);
    const {userId, token} = useAuth()
    useEffect(() => {
        const get_mytasks = async () => {
            try{
                const res = await axios.get(`http://127.0.0.1:8000/mytasks/${userId}/`, {headers : {
                    Authorization : `Token ${token}`
                }})
                setLoading(true)
                setMyTasks(res.data)
                console.log(res.data)
            }catch(error){
                setError('error fetching your tasks')
            }finally{
                setLoading(false)
            }
            
        }
        get_mytasks()
    }, [userId, token])
    
    
      const toggleMenu = (taskId) => {
        setActiveTaskId(prevTaskId => prevTaskId === taskId ? null : taskId);
        console.log(taskId)
      }
  return (
    <>
    <h2>MyTasks</h2>
    {myTasks.length === 0 ?   <h3>You have no tasks Assigned</h3> :
        <ul className='mytasks'>
          
            { myTasks.map(ut => (<li key={ut.id} className='mytask-item'>
              <div>
            <p>Name : {ut.task.task_name}</p>
            <p>Description : {ut.task.task_description}</p>
            <p>Status : {ut.task.task_status}</p>
            <p>Priority : {ut.task.priority}</p>
            <p>Assigned by {ut.assigned_by.username}</p>
            </div>
            <div>
      {/* The 3-Dot Menu Button */}
      {/* <button onClick={() => setShowmenu(!showmenu)}>
        &#x22EE;
      </button> */}
      <button className="three-dots-btn" onClick={() => toggleMenu(ut.id)}>
                                &#x22EE;
                            </button>

      {/* Menu */}
      {activeTaskId === ut.id && (
        <div className="menu">
          <ChangeStatus id = {ut.task.id}></ChangeStatus>
          <ChangeAssign id = {ut.task.id}></ChangeAssign>
        </div>
      )}
    </div>
                       
            </li>))
            }
            
          </ul>}
        {error && <p>{error}</p>}
        {loading && <p>Fetching you tasks ...</p>}
    </>
  )
}

export default MyTasks