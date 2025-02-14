import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from './user/Auth';
function Home() {
  useEffect(() => {
            if (isAuthenticated()) {
              // Redirect the user to the home page or dashboard if they're already logged in
              window.location.href = '/dashboard'; // Change '/home' to your desired path
            }
          }, []);
  return (
    <div className='Home'>
    <Link to = '/signup'><button className='signup'>Sign Up</button></Link>
    <Link to = '/signin'><button className='signIn'>Sign In</button></Link>
    </div>
    
  )
}

export default Home