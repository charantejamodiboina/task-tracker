import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../user/Auth';
function Update() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [newtask_name, setName] = useState('')
    const [newtask_description, setDescription] = useState('')
    const [newtask_status, setStatus] = useState('pending')
    const [newpriority, setPriority] = useState()
    const [newdeadline, setDeadline] = useState('')
    const [newstarttime, setStarttime] = useState('')
    const [newclosingtime, setClosingtime] = useState('')
    const {token} = useAuth()
    // const [newduration, setDuration] = useState('')
    const navigate =  useNavigate();
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16); // yyyy-MM-ddThh:mm format
    };

    useEffect(() => { 
        const fetchdata = async ()=>{
        try {
            const res = await axios.get(`http://127.0.0.1:8000/task/${id}/`, {headers : {
                Authorization : `Token ${token}`
            }});
            console.log(res.data)
            setName(res.data.task_name);
            setDescription(res.data.task_description);
            setStatus(res.data.task_status);
            setPriority(res.data.priority);
            setDeadline(formatDateForInput(res.data.deadline || ''));
            setStarttime(formatDateForInput(res.data.start_time || ''));
            setClosingtime(formatDateForInput(res.data.completed_at || ''));
            // setDuration(formatDateForInput(res.data.task_duration || ''));
            setLoading(false);
        } catch (error) {
            setError('failed to fetch data')
        };
    };
        if (id) {
            fetchdata();
        }

}, [id, token])
    const Update_task_btn = async (e) => {
        e.preventDefault();
        navigate('/tasklist');
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/task/${id}/`, {
                task_name:newtask_name,
                task_description:newtask_description, 
                task_status:newtask_status, 
                priority:newpriority,
                deadline:newdeadline || undefined, 
                start_time:newstarttime || undefined, 
                completed_at:newclosingtime || undefined
            }, {headers : {
                Authorization : `Token ${token}`
            }});
            setError(null);
            setLoading(false);
        } catch (error) {
            setError('failed to update data')
        }
    }
  return (
    <>
    <form onSubmit={Update_task_btn} className='UpdateTask'>
        <input 
        type='text'
        value={newtask_name}
        onChange={(e) => setName(e.target.value)}
        />
        <textarea 
        type='text'
        value={newtask_description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <label>Task Status</label>
        <select value={newtask_status} onChange={(e)=>setStatus(e.target.value)}>
            <option value={"pending"}>Pending</option>
            <option value={"completed"}>Completed</option>
            <option value={"working"}>Working</option>
            <option value={"testing"}>Testing</option>
            <option value={"overdue"} disabled>Overdue</option>
        </select>
        <select value={newpriority} onChange={(e)=> setPriority(e.target.value)}>
            <option value = 'low'>Low</option>
            <option value = 'medium'>Medium</option>
            <option value = 'high'>High</option>
        </select>
        <input
        type='datetime-local'
        value={newstarttime}
        onChange={(e)=>setStarttime(e.target.value) || null}
        disabled
        />
        <input
        type='datetime-local'
        value={newclosingtime}
        onChange={(e)=>setClosingtime(e.target.value) || null}
        disabled
        />
        <input
        type='datetime-local'
        value={newdeadline}
        onChange={(e)=>setDeadline(e.target.value) || null}
        />
        <button type="submit">Update</button>
    </form>
    {loading && <p>Updating . . .</p>}
    {error && <p>{error}</p>}
    </>
  )
}

export default Update