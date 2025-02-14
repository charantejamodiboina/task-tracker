import React, { useEffect, useState } from 'react'
import { useAuth } from './Auth'
import useUrl from '../Url'
import axios from 'axios'

function ChangeStatus({id}) {
    const [status, setStatus] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState(false)
    const {token} = useAuth()
    const url = useUrl()

    useEffect(() => {
       const fetchdata = async () =>{
        try {
            const res = await axios.get(`${url}/task/${id}/`, {headers :{
                Authorization : `Token ${token}`
            }})
            console.log(res)
            setStatus(res.data.task_status)
            setLoading(true)
        } catch (error) {
            setError('error fetching data')
        }finally{
            setLoading(false)
        }
        
       }
       fetchdata()
    }, [token, id, url])
    useEffect(()=> {
        const changeTaskStatus = async () => {
            try {
                axios.patch(`${url}/task/${id}/`, { "edited_field": "task_status", "task_status": status },
                    { headers: { Authorization : `Token ${token}` } })
            } catch (error) {
                setError("error updating Status")
            }
        }
        changeTaskStatus()
    }, [token, id, status, url])
const handleStatus = (newStatus) => {
    setStatus(newStatus)
    setMenu(false)
    window.location.reload()


}

const toggleMenu = () => setMenu(!menu)
  return (
    <>
    <button onClick={toggleMenu} aria-label="Main Menu">Status</button>
    {
        menu && (
        <div className="status-menu">
            <button onClick={() => handleStatus("pending")}>Pending</button>
            <button onClick={() => handleStatus("working")}>Working</button>
            <button onClick={() => handleStatus("testing")}>Testing</button>
            <button onClick={() => handleStatus("completed")}>Completed</button>
        </div>
    )}
    {error && <p>{error}</p>}
    {loading && <p>fetching data</p>}
    </>
  )
}

export default ChangeStatus