import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth, isAuthenticated } from './Auth'
import { MdHome } from "react-icons/md";
function Signin() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {login} = useAuth()
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
        const response = await axios.post('http://127.0.0.1:8000/login', {
          username:email,
          password:password,
        }, {
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if (response.status === 200){
          const {access, id, role} = response.data
          login(access, id, role)
          
          console.log(response.data)
          console.log(access, id)
          navigate('/dashboard')
        }
      }catch(error){
        setError('error occured')
      }finally{
        setLoading(false)
      }
      
    }
      return (
    <form onSubmit={handleSumit} className='Signin'>
      <div>
        <input type='email' 
        value={email} 
        placeholder='Email' 
        onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
      <input type='password' 
        value={password} 
        placeholder='Password' 
        onChange={e => setPassword
        (e.target.value)}/>
      </div>
      <div className='button-div'>
      <button className='Sbutton'>SignIn</button>
      <Link to={`/`}><MdHome className='home'/></Link>
      </div>
        
        {error && <p>{error}</p>}
        {loading && <p>loading ....</p>}
    </form>
  )
}

export default Signin