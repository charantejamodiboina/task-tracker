import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../user/Auth';
const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
function TaskId() {
    const {id} = useParams();
    const [task, setTask] = useState('');
    const [user, setUser] = useState('');
    const [error,  setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/task/${id}/`,{headers : {
          Authorization : `Token ${token}`
         }})
        .then(response => {
            setTask(response.data);
            setLoading(false);
            setError(null)
        }).catch(() =>{ setError('failed to fetch task')})
        .finally(
            setLoading(false)
        )
    }, [id, token])
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/utask/${id}/`,{headers : {
        Authorization : `Token ${token}`
       }})
      .then(response => {
          setUser(response.data);
          console.log(response.data)
          setLoading(false);
          setError(null)
      }).catch(() =>{ setError('Not Assigned Yet')})
      .finally(
          setLoading(false)
      )
  }, [id, token])
  return (
    <>
    <p>Name : {task.task_name}</p>
    <p>Description : {task.task_description}</p>
    <p>Task Status : {task.task_status}</p>
    <p>Priority : {task.priority}</p>
    {task.start_time ? <p>Start Time : {formatDate(task.start_time)}</p> : null}
    {task.completed_at ? <p>Closing time : {formatDate(task.completed_at)}</p> : null }
    {task.task_duration ? <p>Task Duration : {task.task_duration}</p> : null}
    {task.deadline ? <p>Deadline : {formatDate(task.deadline)}</p> : null}
    {user?.user?.username && <p>Assigned to: {user.user.username}</p>}
{user?.assigned_by?.username && <p>Assigned by: {user.assigned_by.username}</p>}
    {loading && <p>Loading . . . </p>}
    {error && <p>{error}</p>}
    </>
  )
}

export default TaskId