# 📝 Todo App (MERN Stack)
A full-stack **Todo Application** built using the **MERN Stack** with secure authentication, OTP verification, and role-based protected routes.
Users can create, view, update, and delete todos with deadlines and completion status.

## 😒 What Problem does it solve?
There are so many people who forget that what all I have to do. That's why I created a **To-do Application** Where people can add their task and wherever they will have time then they can completed their task.

## 🚀 Features
###  🔐 Authentication & Security
- User Registration & Login
- User forget their password
- OTP verification via Email
- JWT Authentication with HTTP-Only Cookies
- Protected Routes (Frontend & Backend)
- Auto logout on token expiry

### ✅ Todo Management
- Create Todo with title, description & due date
- View all todos (due date first)
- View single todo details
- Edit existing todo
- Delete todo
- Mark todo as Completed / Not Completed
- Prevent past due dates select

### 🖥 Frontend
- Built with React + Vite
- Context API for global state
- Protected & Public Routes
- Axios Instance with interceptors
- Toast notification (reat-hot-toast)
- Responsive UI

### 🧠 Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Middleware-based authorization
- RESTful APIs

## 🛠 Tech Stack

### 🖥 Frontend
- React
- Vite
- React Route Dom
- Axios
- Context API
- Tailwind CSS
- React Hot Toast
- React Icon

### 🧠 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer / Email API (OTP)
- Cookie Parser

## 📂 Project Structure


### 🖥 Frontend
```
src/
├── components/
├── pages/
├── context/
├── routes/
├── utils/
├── App.jsx
└── main.jsx
```
### 🧠 Backend

```
backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
|-- utils/
├── index.js
└── .env
```

## 🔑 Environment Variables

### 🖥 Frontend (`.env`)
```
VITE_BACKEND_URL=https://your-backend-url.com
```



### 🧠 Backend (`.env`)
```
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
NODE_ENV=production
BREVO_API_KEY=your-brevo-api-key
BREVO_SMTP_USER=your-brevo-smtp-user
BREVO_SMTP_KEY=your-brevo-smtp-key
```

## 🔄 API Overview

### Auth Routes
- `POST /api/auth/create-user`
- `POST /api/auth/login-user`
- `GET /api/auth/me`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `POST /api/auth/forget-password`
- `POST /api/auth/reset-password`

### Todo Routes
- `POST /api/create-todo`
- `GET /api/get-all-todos`
- `GET /api/get-single-todo/:id`
- `PATCH /api/todo-status-update/:id`
- `PUT /api/update-todo/:id`
- `DELETE /api/delete/:id`

## 🔒 Route Protection Logic
- Unauthorized user are redirect to Login
- Logged-in users cannot access Login/Register
- User is redirected back to the page they came from after login

## 🧪 How to Run Locally

### 🧑‍💻 Open terminal and paste it

```
 git clone https://github.com/a1sartaj/todos.git
```

### 🧠 Backend
```
    cd Backend
    npm install
    npm start
```

### 🖥 Frontend

```
    cd Frontend
    npm install
    npm run dev 
```

## 🌍 Deployment

- **Frontend** : VPS server
- **Backend** : VPS server
- **Database** : VPS server

## 🧑‍💻 Author
### Sartaj Alam
- GitHub : https://github.com/a1Sartaj
- LinkedIn : https://linkedin.com/in/a1sartaj
- Portfolio : https://a1sartaj.in

## ⭐ Future Improvements
- Drag & drop todos
- Search & filter
- Priority levels
- Remider notifications
- Admin dashboard

## 📄 License
This project is licensed under the MIT License.











