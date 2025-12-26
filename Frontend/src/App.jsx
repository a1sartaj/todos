import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AddTodo from './pages/AddTodo'
import ViewTodo from './pages/ViewTodo'

const App = () => {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen' >

      {/* Heading Todo List */}
      <h1 className="text-center text-2xl font-bold text-[#E6E6E6] py-4">Todo List</h1>

      {/* Starts Routes */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/add-todo' element={<AddTodo />} />
        <Route path='/view-todo/:id' element={<ViewTodo />} />

      </Routes>

    </div >
  )
}

export default App
