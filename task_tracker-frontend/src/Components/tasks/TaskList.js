import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Delete from './Delete'
import { Link } from 'react-router-dom'
import { useAuth } from '../user/Auth'
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] =useState(null);
    const [select, setSelect] = useState('all')
    const [priority, setPriority] = useState('none')
    const { token, role } = useAuth()

    useEffect(() => {
      let url = 'http://127.0.0.1:8000/task/'
      if (select ==='all'&& priority === 'none'){
        url = `${url}`
      }else if(select === 'none'){
        url = `${url}?priority=${priority}`
      }else if(priority === 'none'){
        url = `${url}?status=${select}`
      }else{
        url = `${url}?status=${select}&priority=${priority}`
      }
        axios.get(url, {headers : {
          Authorization : `Token ${token}`
        }})
        .then(response =>
        {console.log(response, url) 
        setTasks(response.data)}
        ).catch(error =>
        {console.log(error)
        setError()
        }
        )
    }, [select, priority, token])


    
  return (
    <div className='Tasklist'>
    <h2>Task List</h2>
    <select value={select} onChange={(e)=> setSelect(e.target.value)}>
        <option value = 'all'>all</option>
        <option value = 'completed'>Completed</option>
        <option value = 'pending'>Pending</option>
        <option value = 'testing'>Testing</option>
        <option value = 'working'>Working</option>
        <option value = 'none'>None</option>
    </select>
    <select value={priority} onChange={(e)=> setPriority(e.target.value)}>
        <option value = 'none'>None</option>
        <option value = 'low'>Low</option>
        <option value = 'medium'>Medium</option>
        <option value = 'high'>High</option>
    </select>
    <ul>
        { tasks.map(task => (<li key={task.id} className={`task-items ${task.priority === 'high' ? 'high-priority' : task.priority === 'medium' ? 'medium-priority' : task.priority === 'low' ? 'low-priority' : ''}`}>
            <Link className='Userdeatalslink' to = {`/task/${task.id}/`}><h3>{task.task_name}</h3></Link>
            <p className='tasklist-description'>{task.task_description}</p>
            <p>Status : {task.task_status}</p>
            <p>Priority : {task.priority}</p>
            {task.deadline? <p>Deadline : {new Date(task.deadline).toLocaleString()}</p>: null}
            {role === 'admin' && (<Delete id ={task.id}/>)}
            {role === 'admin' && <Link to={`/tasklist/${task.id}/`}><button>Update</button></Link>}</li>) )}
    </ul>
    {error && <span>{error}</span>}
    </div>
  )
}

export default TaskList