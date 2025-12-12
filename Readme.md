# 📝Task Management Application

**A full-stack Task management application built with Node.js, Express, MySQL2, React, Vite, and TailwindCSS.**
**`Features authentication, CRUD operations for tasks, and rate-limiting for security.`**

## [Live Demo](https://taskmanagementappv1.netlify.app)

## 🚀 Features

1. 🔐 Authentication System

- Register, login, logout
- JWT token authentication using HTTP-only cookies
- Authentication status endpoint
- Rate limiting on all auth routes
- Protected routes using custom middleware

2. 📝 Task Management (CRUD)

- Create a task
- Read all tasks
- Update a task
- Delete a task
- All routes protected via auth middleware

## Tech Stack

### ⚙️ Backend

- Node.js

- Express.js

- MySQL2

- JWT Authentication

- Cookie-based sessions

- Rate limiting using express-rate-limit

### 🎨 Frontend

- React.js

- Tailwind CSS

- Vite

- SVGR for icons

- Clean UI with responsive design

## 📁 Folder Structure

```bash
task_management_app/
│
├── client/        # Frontend (React + Vite)
│
├── server/        # Backend (Node.js, Express, MySQL)
│
└── Readme.md      # Project documentation

```

## 🧩 API Endpoints

- Auth Routes (`/api/auth`)

| Method | Endpoint    | Description       | Protected |
| ------ | ----------- | ----------------- | --------- |
| POST   | `/register` | Register new user | ❌        |
| POST   | `/login`    | Login user        | ❌        |
| GET    | `/logout`   | Logout user       | ✔️        |
| GET    | `/status`   | Get auth status   | ✔️        |

`All auth routes use rate limiter`

- Example:

```js
app.use("/api/auth", apiLimiter, authRouter);
```

- Task Routes (`/api/tasks`)

| Method | Endpoint      | Description   | Protected |
| ------ | ------------- | ------------- | --------- |
| POST   | `/create`     | Create a task | ✔️        |
| GET    | `/`           | Get all tasks | ✔️        |
| PUT    | `/update/:id` | Update a task | ✔️        |
| DELETE | `/delete/:id` | Delete a task | ✔️        |
