import React, {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../user/Auth';
function Task() {
    const [task_name, setName] = useState('');
    const [task_description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const {token} = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)
      try {
        const response =await axios.post('http://127.0.0.1:8000/task/', {
          task_name:task_name,
                task_description:task_description,  
                priority:priority,
                deadline:deadline || undefined
        }, {headers : {Authorization : `Token ${token}`}})
        if (response.status === 201){
          setName('')
          setDescription('')
          setPriority('')
          setDeadline('')
          setSuccess(true)
        }
      } catch (error) {
        setError('somthing went wrong')
      } finally {
        setLoading(false)
      }
        
        

    }
  return (
    <form onSubmit={handleSubmit} className='AddTask'>
      <h2>Add Task</h2>
        <input type='text' 
        placeholder='Name of the Task' 
        value={task_name} 
        disabled={loading}
        onChange={e => setName(e.target.value)}/>
        <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
        <option value={"none"}>Select Priority Level</option>
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
        </select>
        <textarea type='text' 
        placeholder='Task Description' 
        value={task_description} 
        disabled={loading}
        onChange={e => setDescription(e.target.value)}/>
        <label>Deadline</label>
        <input type='datetime-local'
        value={deadline} 
        onChange={e => setDeadline(e.target.value) || null}/>
        <button type='submit'>Submit</button>
        {loading && <p>Submitting you task . . .</p>}
        {success && <p>task submitted succesfully</p>}
        {error && <p>{error}</p>}
    </form>
  )
}

export default Task