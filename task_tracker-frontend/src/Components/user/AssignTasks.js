import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './Auth';

function AssignTasks() {
    const [tasks, setTask] = useState([]);
    const [users, setUser] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // Fetch users, tasks, and assigned tasks
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/users', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUser(res.data);
            } catch (error) {
                setError('Failed to fetch users data');
            }
        };

        const getTasks = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/task/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setTask(res.data);
            } catch (error) {
                setError('Failed to fetch tasks data');
            }
        };

        const assignedTask = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/utask/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                // Store task IDs of assigned tasks
                console.log(res.data)
                const assigned = res.data.map((item) => item.task.id);
                setAssignedTasks(assigned);
                console.log(assigned)
            } catch (error) {
                setError('Failed to fetch assigned tasks');
            }
        };

        getUsers();
        getTasks();
        assignedTask();
    }, [token]);

    // Handle task assignment to user
    const assignTasktoUser = async (e) => {
        e.preventDefault();
        if (!selectedTask || !selectedUser) {
            setError('Please select both task and user');
            return;
        }

        const data = {
            user: selectedUser,
            task: selectedTask,
        };

        try {
            const res = await axios.post('http://127.0.0.1:8000/utask/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setLoading(true);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            setError('Failed to assign task');
        } finally {
            setLoading(false);
        }
    };

    const availableTasks = tasks.filter(task => !assignedTasks.includes(task.id));
    console.log(availableTasks)
    return (
        <>
            <form onSubmit={assignTasktoUser} className='AssignTask'>
            <h2>Assing Task to User</h2>
                <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>

                <select id="task" value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
                    <option value="">Select Task</option>
                    {availableTasks.map((task) => (
                        <option key={task.id} value={task.id}>
                            {task.task_name}
                        </option>
                    ))}
                </select>

                <button type="submit">Assign</button>
            </form>

            {error && <span>{error}</span>}
            {loading && <span>Loading...</span>}
        </>
    );
}

export default AssignTasks;
