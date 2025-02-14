import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from './user/Auth'
function PrivateRoute({children}) {
    const {token} = useAuth()
    if (!token){
        return <Navigate to='/signin' />
    }
  return (
    children
  )
}

export default PrivateRoute