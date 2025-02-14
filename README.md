# Task Tracker

Task Tracker is a full-stack task management application built with Django Rest Framework (backend) and React.js (frontend), using SQLite3 as the database.

## Features

- User authentication (registration and login)
- Task management (create, update, delete, view tasks)
- Task filtering by status and priority
- Assigning tasks to users
- User-specific task views
- Token-based authentication

## Technologies Used

### Backend:
- Python
- Django Rest Framework
- SQLite3
- Django Rest Framework Authentication

### Frontend:
- React.js
- Axios (for API requests)

## API Endpoints

| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | `/task/` | Retrieve all tasks (filter by status and priority) |
| POST | `/task/` | Create a new task |
| GET | `/task/<int:pk>/` | Retrieve a task by ID |
| PUT | `/task/<int:pk>/` | Update a task (full update) |
| PATCH | `/task/<int:pk>/` | Partially update a task |
| DELETE | `/task/<int:pk>/` | Delete a task |
| GET | `/count` | Get count of tasks by status |
| POST | `/register` | Register a new user |
| POST | `/login` | Login user and get token |
| GET | `/users` | Get list of registered users |
| GET | `/utask/` | List user tasks |
| POST | `/utask/` | Assign task to a user |
| GET | `/utask/<int:pk>/` | Retrieve user-task by task ID |
| PATCH | `/utask/<int:pk>/` | Update user-task details |
| GET | `/mytasks/<int:pk>/` | Retrieve tasks assigned to a specific user |

## Installation and Setup

### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd task-tracker
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations and run the server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## Authentication
This project uses Token-based authentication. After login, users receive a token, which must be included in the `Authorization` header for authenticated requests.

Example:
```sh
Authorization: Token <your-token>
```


