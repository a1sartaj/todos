import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AddTodo from './pages/AddTodo'
import ViewTodo from './pages/ViewTodo'
import EditTodo from './pages/EditTodo'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='relative flex  flex-col items-center  md:justify-center min-h-screen' >

      {/* Navbar */}
      <Navbar />

      {/* Starts Routes */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/add-todo' element={<AddTodo />} />
        <Route path='/view-todo/:id' element={<ViewTodo />} />
        <Route path='/edit-todo/:id' element={<EditTodo />} />

      </Routes>

    </div >
  )
}

export default App
