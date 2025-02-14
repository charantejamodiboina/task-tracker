import React, { useEffect, useState } from 'react'
import { useAuth } from './Auth'
import useUrl from '../Url'
import axios from 'axios'

function ChangeAssign({id}) {
    const [users, setUser] = useState([])
    const [selectuser, setSelectUser] = useState(null)
    const [menu, setMenu] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)
    const {token} = useAuth()
    const url = useUrl()

    useEffect(()=> {
        const fetchdata = async()=>{
            try {
                const res = await axios.get(`${url}/users`, {headers :{
                    Authorization : `Token ${token}`
                }})
                setloading(true)
                console.log(res)
                setUser(res.data)
            } catch (error) {
                setError('error fetching data')
            }finally{
                setloading(false)
            }
        }
        fetchdata();
        
    }, [url, token])
    useEffect(()=>{
        const changeAssignTask = async () => {
            
            try {
                await axios.patch(`${url}/utask/${id}/`, {'edited_field' : 'user', 'user':selectuser}, {headers : {
                    Authorization : `Token ${token}`
                }})
            } catch (error) {
                setError('error updating data')
            }
        }
        
        if (selectuser) { // Only run this effect when `users` is set
            changeAssignTask()}
    }, [id, url, users, selectuser, token])

    const handleChangeUser = (newUser) => {
        setSelectUser(newUser);
        setMenu(false);
        window.location.reload()
    }
    const togglemenu = ()=>{
        setMenu(!menu)
    }
  return (
   <>
    <button onClick={togglemenu}> Assign to user</button>
    <div>
        {
            menu && (<ul>
                {users.map(u => (<li key={u.id} ><button onClick={()=>handleChangeUser(u.id)}>{u.username}</button></li>))}
                </ul>)
        }
        {error && {error}}
        {loading && <p>fetching data</p>}
    </div>
   </>
  )
}

export default ChangeAssign




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../user/Auth';
// import AssignTasks from './AssignTasks';
// import Delete from './Delete';

// function TaskList() {
//     const [tasks, setTasks] = useState([]);
//     const [error, setError] = useState(null);
//     const [select, setSelect] = useState('all');
//     const [priority, setPriority] = useState('none');
//     const [selectedTask, setSelectedTask] = useState(null);
//     const [showMenu, setShowMenu] = useState(null);  // State to manage which task's menu is open
//     const [users, setUsers] = useState([]); // Store users for assigning tasks
//     const { token, role } = useAuth();

//     useEffect(() => {
//         // Fetch tasks
//         let url = 'http://127.0.0.1:8000/task/';
//         if (select === 'all' && priority === 'none') {
//             url = `${url}`;
//         } else if (select === 'none') {
//             url = `${url}?priority=${priority}`;
//         } else if (priority === 'none') {
//             url = `${url}?status=${select}`;
//         } else {
//             url = `${url}?status=${select}&priority=${priority}`;
//         }

//         axios
//             .get(url, { headers: { Authorization: `Token ${token}` } })
//             .then((response) => {
//                 setTasks(response.data);
//             })
//             .catch((error) => {
//                 setError(error.message);
//             });

//         // Fetch users for assigning tasks
//         axios
//             .get('http://127.0.0.1:8000/users', { headers: { Authorization: `Token ${token}` } })
//             .then((response) => {
//                 setUsers(response.data);
//             })
//             .catch((error) => {
//                 setError('Failed to fetch users data');
//             });
//     }, [select, priority, token]);

//     const handleTaskSelect = (task) => {
//         setSelectedTask(task);
//     };

//     const toggleMenu = (taskId) => {
//         // Toggle the menu for the clicked task
//         setShowMenu(showMenu === taskId ? null : taskId);
//     };

//     const handleAssignTask = (taskId, userId) => {
//         // Automatically assign the task to the selected user
//         axios
//             .post(
//                 'http://127.0.0.1:8000/utask/',
//                 { user: userId, task: taskId },
//                 { headers: { Authorization: `Token ${token}` } }
//             )
//             .then((response) => {
//                 console.log('Task assigned:', response.data);
//                 setTasks((prevTasks) =>
//                     prevTasks.map((task) =>
//                         task.id === taskId ? { ...task, assigned_to: userId } : task
//                     )
//                 );
//             })
//             .catch((error) => {
//                 setError('Failed to assign task');
//             });
//     };

//     return (
//         <>
//             <select value={select} onChange={(e) => setSelect(e.target.value)}>
//                 <option value="all">all</option>
//                 <option value="completed">Completed</option>
//                 <option value="pending">Pending</option>
//                 <option value="testing">Testing</option>
//                 <option value="working">Working</option>
//                 <option value="none">None</option>
//             </select>
//             <select value={priority} onChange={(e) => setPriority(e.target.value)}>
//                 <option value="none">None</option>
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//             </select>
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task.id}>
//                         <Link to={`/task/${task.id}/`}>
//                             <h3>{task.task_name}</h3>
//                         </Link>
//                         <p>{task.task_description}</p>
//                         <p>Status: {task.task_status}</p>
//                         <p>Priority: {task.priority}</p>
//                         {task.deadline && (
//                             <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
//                         )}

//                         <div className="task-actions">
//                             {/* Three dots menu button */}
//                             <button onClick={() => toggleMenu(task.id)} className="three-dots-btn">
//                                 &#x2022;&#x2022;&#x2022; {/* Unicode for the 3 dots */}
//                             </button>

//                             {showMenu === task.id && (
//                                 <div className="menu">
//                                     {/* Display actions: Delete, Update, and Assign Task */}
//                                     {role === 'admin' && (
//                                         <>
//                                             <Link to={`/tasklist/${task.id}/`}>
//                                                 <button>Update</button>
//                                             </Link>
//                                             <Delete id={task.id} />
//                                         </>
//                                     )}

//                                     {role !== 'admin' && (
//                                         <>
//                                             <button onClick={() => handleTaskSelect(task)}>Assign Task</button>
//                                         </>
//                                     )}

//                                     {showMenu === task.id && (
//                                         <>
//                                             {task.assigned_to ? (
//                                                 <p>Assigned to user {task.assigned_to}</p>
//                                             ) : (
//                                                 <div>
//                                                     <h4>Select User</h4>
//                                                     {users.map((user) => (
//                                                         <button
//                                                             key={user.id}
//                                                             onClick={() => handleAssignTask(task.id, user.id)}
//                                                         >
//                                                             {user.username}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             {error && <span>{error}</span>}
//         </>
//     );
// }

// export default TaskList;









// import React, { useState } from 'react'
// import ChangeStatus from './ChangeStatus' // Assuming ChangeStatus is in the same folder

// function MainMenu({ id }) {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [updateMenuOpen, setUpdateMenuOpen] = useState(false)

//   // Handle opening and closing of the main menu
//   const toggleMenu = () => setMenuOpen(!menuOpen)

//   // Handle opening and closing of the update sub-menu
//   const toggleUpdateMenu = () => setUpdateMenuOpen(!updateMenuOpen)

//   return (
//     <>
//       {/* Main 3-Dot Menu Button */}
//       <button onClick={toggleMenu} aria-label="Main Menu">
//         &#x22EE;
//       </button>

//       {/* Main Menu (View, Update, Delete) */}
//       {menuOpen && (
//         <div className="menu">
//           <button onClick={() => console.log('View clicked')}>View</button>

//           {/* Nested 3-Dot Menu for "Update" */}
//           <button onClick={toggleUpdateMenu}>Update</button>

//           {/* Show nested menu for "Update" */}
//           {updateMenuOpen && (
//             <div className="nested-menu">
//               <button onClick={() => console.log('Nested Action 1')}>Nested Action 1</button>
//               <button onClick={() => console.log('Nested Action 2')}>Nested Action 2</button>
//               <ChangeStatus id={id} /> {/* Add the ChangeStatus component here */}
//             </div>
//           )}

//           <button onClick={() => console.log('Delete clicked')}>Delete</button>
//         </div>
//       )}
//     </>
//   )
// }

// export default MainMenu









// import React, { useEffect, useState } from 'react'
// import { useAuth } from './Auth'
// import useUrl from '../Url'
// import axios from 'axios'

// function ChangeStatus({ id }) {
//   const [status, setStatus] = useState()
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)  // state to toggle the 3-dot menu
//   const { token } = useAuth()
//   const url = useUrl()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${url}/task/${id}/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         })
//         console.log(res)
//         setStatus(res.data.task_status)
//         setLoading(true)
//       } catch (error) {
//         setError('Error fetching data')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [token, id, url])

//   useEffect(() => {
//     const changeTaskStatus = async () => {
//       try {
//         await axios.patch(
//           `${url}/task/${id}/`,
//           { edited_field: 'task_status', task_status: status },
//           { headers: { Authorization: `Token ${token}` } }
//         )
//       } catch (error) {
//         setError('Error updating status')
//       }
//     }
//     if (status) {
//       changeTaskStatus()
//     }
//   }, [token, id, status, url])

//   const handleStatusChange = (newStatus) => {
//     setStatus(newStatus)
//     setMenuOpen(false) // Close the menu when an option is selected
//   }

//   return (
//     <>
//       {/* 3-Dot Menu Button */}
//       <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Change Status">
//         &#x22EE;
//       </button>

//       {/* Dropdown menu */}
//       {menuOpen && (
//         <div className="menu">
//           <button onClick={() => handleStatusChange('pending')}>Pending</button>
//           <button onClick={() => handleStatusChange('working')}>Working</button>
//           <button onClick={() => handleStatusChange('testing')}>Testing</button>
//           <button onClick={() => handleStatusChange('completed')}>Completed</button>
//         </div>
//       )}

//       {/* Loading/Error Handling */}
//       {error && <p>{error}</p>}
//       {loading && <p>Fetching data...</p>}
//     </>
//   )
// }

// export default ChangeStatus
