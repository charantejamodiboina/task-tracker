import React from 'react'
import { useAuth } from './user/Auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { MdOutlineAddTask } from "react-icons/md";
import { LuUserCheck } from "react-icons/lu";
import { MdAssignmentAdd } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";


import './Components.css'
function Navbar() {
  const {logout} = useAuth()
  const navigate = useNavigate()
  const handleSignout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout ?')
    if (confirmed){
    try{
    logout();
    navigate('/signin')
  }catch(error){
    console.log('logout failed', error)
  }
}}
  return (
    <nav className='Navbar'>
    <NavLink activeclassname='active' to = '/dashboard'><MdOutlineDashboard/></NavLink>
    <NavLink activeclassname='active' to = '/create/task/'><MdOutlineAddTask/></NavLink>
    <NavLink activeclassname='active' to = 'tasklist'> <GoTasklist/></NavLink>
    <NavLink activeclassname='active' to = 'mytasks'><LuUserCheck/></NavLink>
    <NavLink activeclassname='active' to = 'usertasks'><MdAssignmentAdd/></NavLink>
    <button onClick={handleSignout}> <HiOutlineLogout/> </button>
    </nav>
  )
}

export default Navbar