import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from './user/Auth'
function AdminRoute({children}) {
    const {role} = useAuth()
    if(role !== 'admin'){
        return (<Navigate to = '/dashboard'/>)
    }
  return (
    children
  )
}

export default AdminRoute