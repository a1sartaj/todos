import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AddTodo from './pages/AddTodo'
import ViewTodo from './pages/ViewTodo'
import EditTodo from './pages/EditTodo'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='relative flex flex-col  w-full min-h-dvh' >

      {/* Navbar */}
      <header className='w-full' >
        <Navbar />
      </header>

      {/* Starts Routes */}
      <main className='flex-1 w-full   max-w-3xl mx-auto bg-[#ED985F] overflow-y-auto'>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/add-todo' element={<AddTodo />} />
          <Route path='/view-todo/:id' element={<ViewTodo />} />
          <Route path='/edit-todo/:id' element={<EditTodo />} />

        </Routes>
      </main>

    </div >
  )
}

export default App
