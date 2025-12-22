import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

const TodoView = () => {

    const { setTodoViewActive, todoView } = useContext(TodoContext)

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]  py-2 bg-white  rounded-lg'>
            <h2 className='px-2 mb-4 text-2xl font-medium border-b' >{todoView.title}</h2>
            <p className='px-2 text-lg ' >{todoView.description}</p>

            <div className='flex justify-between items-end px-2' >
                <p className='text-sm text-gray-500 '>Deadline : {todoView.date}</p>
                <button className='px-2 text-lg text-white bg-[#001F3D] rounded-lg' onClick={() => setTodoViewActive(false)} >Close</button>
            </div>
        </div>
    )
}

export default TodoView
