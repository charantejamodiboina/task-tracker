import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../user/Auth'
function Delete({id}) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {token} = useAuth()
    const remove_task = async () => {
        const confirmed = window.confirm('Are you sure you want to delee the task');
        if(confirmed){
            try {
                await axios.delete(`http://127.0.0.1:8000/task/${id}/`, {
                    headers : {
                        Authorization : `Token ${token}`
                    }
                });
                setError(null);
                setLoading(true);
                window.location.reload()
            } catch (error) {
                setError('Something went wrong bitch')
            }finally{
                setLoading(false)
            }
        }
    }
  return (
    <>
    {loading?( <span>Deleting . . .</span> ): <button onClick={remove_task}>Delete</button>}
    {error && <p>{error}</p>}
    </>
  )
}

export default Delete