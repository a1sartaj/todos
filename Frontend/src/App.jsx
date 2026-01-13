import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import ViewTodo from './pages/ViewTodo'
import EditTodo from './pages/EditTodo'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import { Toaster } from 'react-hot-toast';
import OtpPage from './pages/OtpPage'
import CreateTodoPage from './pages/CreateTodoPage'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

const App = () => {
  return (
    <div className='relative flex flex-col  w-full min-h-dvh' >

      {/* Navbar */}
      {/* <header className=' w-full' > */}
      <header className="sticky top-0 z-10 w-full bg-[#ED985F] drop-shadow-black/25 drop-shadow-[0px_2px_4px]">
        <Navbar />
      </header>

      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Starts Routes */}
      {/* <main className='flex-1 flex items-center justify-center h-full w-full   max-w-3xl mx-auto bg-[#ED985F] overflow-y-auto'> */}
      <main className="flex-1 flex items-center justify-center w-full max-w-3xl mx-auto bg-[#ED985F] overflow-y-auto">
        <Routes>

          {/* Protected Routes */}
          <Route path='/' element={<ProtectedRoute > <Home /> </ProtectedRoute>} />
          <Route path='/create-todo' element={<ProtectedRoute> <CreateTodoPage /> </ProtectedRoute>} />
          <Route path='/view-todo/:id' element={<ProtectedRoute><ViewTodo /></ProtectedRoute>} />
          <Route path='/edit-todo/:id' element={<ProtectedRoute ><EditTodo /></ProtectedRoute>} />

          {/* Public Routes */}
          <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} />
          <Route path='/forget-password' element={<PublicRoute><ForgetPassword /></PublicRoute>} />
          <Route path='/verify-otp' element={<PublicRoute><OtpPage /></PublicRoute>} />

        </Routes>
      </main>

    </div >
  )
}

export default App
