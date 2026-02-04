# Primetrade Task Manager — Fullstack Assignment

## Overview
This is a fullstack web application for task management, built as part of the Primetrade Frontend Developer Intern assignment. It features user authentication, a dashboard, and CRUD operations for tasks, with a modern UI and secure backend.

---

## Tech Stack
- **Frontend:** React.js (Vite), Material UI, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, express-validator, morgan

---

## Setup Instructions

### 1. Clone the repository
```
git clone <your-fork-or-repo-url>
cd Primetrade-Ai-Assignment-
```

### 2. Backend Setup
```
cd Backend
npm install
```
Create a `.env` file in the Backend folder:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=supersecretkey
```
Start the backend server:
```
npm run dev
```

### 3. Frontend Setup
```
cd ../Frontend/assignment
npm install
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Demo Credentials (Optional)
- You can register a new user or use seeded credentials if provided.

---

## API Documentation

### Auth
- `POST /api/v1/auth/signup` — Register
- `POST /api/v1/auth/login` — Login

### Profile
- `GET /api/v1/me` — Get profile (JWT required)
- `PUT /api/v1/me` — Update profile (JWT required)

### Tasks
- `POST /api/v1/tasks` — Create task
- `GET /api/v1/tasks` — List tasks
- `PUT /api/v1/tasks/:id` — Update task
- `DELETE /api/v1/tasks/:id` — Delete task

All protected routes require a Bearer JWT token in the `Authorization` header.

---

## Screenshots

| Login | Signup | Dashboard | Tasks |
|-------|--------|-----------|-------|
| ![Login](public/one.png) | ![Signup](public/two.png) | ![Dashboard](public/three.png) | ![Tasks](public/four.png) |

---



---





