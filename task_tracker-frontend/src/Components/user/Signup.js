import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { isAuthenticated } from './Auth'
import { MdHome } from "react-icons/md";


function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
          if (isAuthenticated()) {
            // Redirect the user to the home page or dashboard if they're already logged in
            window.location.href = '/dashboard'; // Change '/home' to your desired path
          }
        }, []);
    const handleSumit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)
      try{
        const response = await axios.post('http://127.0.0.1:8000/register', {
          username:username,
          email:email,
          password:password,
        })
        if (response.status === 201){

        }
      }catch(error){
        setError('error occured')
      }finally{
        setLoading(false)
      }
      navigate('/signin')
    }
      return (
        <>
    <form onSubmit={handleSumit} className='Signup'>
        <input type='text' 
        value={username} 
        placeholder='Username' 
        onChange={e => setUsername(e.target.value)}/>
        <input type='email' 
        value={email} 
        placeholder='Email' 
        onChange={e => setEmail(e.target.value)}/>
        <input type='password' 
        value={password} 
        placeholder='Password' 
        onChange={e => setPassword
        (e.target.value)}/>
        <div className='button-div'><button className='Sbutton'>SignUp</button>
        <Link to={`/`}><MdHome className='home'/></Link></div>
    </form>
    {loading && <p>loading ....</p>}
    {error && <p>{error}</p>}
    </>
  )
}

export default Signup