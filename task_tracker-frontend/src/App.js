// import logo from './logo.svg';
import './App.css';
import Task from './Components/tasks/Task';
import Dashboard from './Components/Dashboard';
import {Routes, Route, useLocation} from 'react-router-dom'
import { AuthProvider} from './Components/user/Auth';
import Navbar from './Components/Navbar';
import TaskList from './Components/tasks/TaskList';
import Update from './Components/tasks/Update';
import TaskId from './Components/tasks/TaskId';
import Home from './Components/Home';
import Signin from './Components/user/Signin';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import Signup from './Components/user/Signup';
import AssignTasks from './Components/user/AssignTasks';
import MyTasks from './Components/user/MyTasks';
import ChangeStatus from './Components/user/ChangeStatus';
import Logo from './todo.png'
function App() {
  const location = useLocation()
  const hideNav = ['/', '/signin', '/signup']
  const showNav = !hideNav.includes(location.pathname)
  return (
    <div className="App">
      <header><img src={Logo} style={{ height: 40, width: 'auto' }} alt='website-logo' /><h3>Task Tracker</h3></header>
      <AuthProvider>
        {showNav && <Navbar></Navbar>}
      <Routes className = "Routes">
          <Route path='/create/task/' element = {<Task></Task>}></Route>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='signin' element = {<Signin/>}></Route>
          <Route path='signup' element = {<Signup/>}></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='tasklist' element = {<PrivateRoute><TaskList/></PrivateRoute>}></Route>
          <Route path='task/:id/' element = {<PrivateRoute><TaskId/></PrivateRoute>} ></Route>
          <Route path='tasklist/:id/' element = {<AdminRoute><PrivateRoute><Update/></PrivateRoute></AdminRoute>}></Route>
          <Route path='usertasks' element = {<PrivateRoute><AssignTasks/></PrivateRoute>}></Route>
          <Route path='mytasks' element = {<PrivateRoute><MyTasks/></PrivateRoute>}></Route>
          <Route path='mytasks' element = {<PrivateRoute><MyTasks/></PrivateRoute>}></Route>
          <Route path='change' element = {<PrivateRoute><ChangeStatus/></PrivateRoute>}></Route>
        </Routes>
        </AuthProvider>
    </div>
    
  );
}

export default App;
