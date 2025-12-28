import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../context/TodoContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";



const ViewTodo = () => {

    const todoId = useParams().id;
    const navigate = useNavigate();
    const { todos, setTodos, handleDeleteTodo } = useContext(TodoContext)
    const [todo, setTodo] =
        useState({});
    const fetchedTodo = () => {
        const foundTodo = todos.find(t => t._id.toString() === todoId.toString());
        setTodo(foundTodo);
    }

    const handleToggleCompleted = () => {
        const updateTodos = todos.map(t => {
            if (t._id.toString() === todoId.toString()) {
                return { ...t, isCompleted: !t.isCompleted }
            }
            return t;
        })
        setTodos(updateTodos);
    }

    // it will navigate to edit todo page
    const handleEditTodo = (id) => {
        navigate(`/edit-todo/${id}`);
    }

    useEffect(() => {
        fetchedTodo();
    }, [todoId, todos])

    return (

        <div className="relative w-full max-w-md px-2 md:px-0">

            {/* Back Button */}
            <button className='absolute top-4 left-4 flex items-center justify-center   ' onClick={() => navigate(-1)}  >
                <IoMdArrowRoundBack className="text-5xl text-[#ED985F] rounded-full  transition-all duration-300 ease-in   shadow-white bg-black  hover:bg-white hover:shadow-[0_0_20px] cursor-pointer " />
            </button>

            {/* Full Section */}
            <div className="flex items-center justify-center bg-[#ED985F] rounded-lg w-full  h-[600px]  p-2 " >

                {/* Content Box */}
                <div className='w-[90%] py-2  bg-[#F7B980] rounded-lg' >
                    {/* Title and mark completed toggle */}
                    <div className='flex item-start  px-2 pb-2 mb-2 border-b' >
                        <h2 className=' flex-1 text-2xl font-bold ' >{todo.title}</h2>

                        {/* Toggle Button Containt*/}
                        <div className='flex items-start gap-2 mt-1  ' >
                            <p className=' text-sm text-gray-500' >{todo.isCompleted ? "Completed" : "Not Completed"}</p>

                            {/* Toggle Button */}
                            <div className={` flex items-center w-7 h-4  rounded-full ${todo.isCompleted ? "bg-green-500" : "bg-white"} transition-all duration-300  cursor-pointer `} onClick={handleToggleCompleted}  >
                                <div className={`w-3 h-3 rounded-full ${todo.isCompleted ? "ml-3.5 bg-white" : "ml-0.5 bg-green-500"} transition-all duration-300  `} ></div>
                            </div>
                        </div>
                    </div>
                    <p className='pl-2 mb-2 text-lg font-medium text-gray-700 leading-6' >{todo.description}</p>
                    <p className='pl-2 text-sm text-gray-400'>Deadline : {todo.date}</p>

                    <div className='flex items-center justify-between pt-2 mt-2 border-t border-gray-500  ' >
                        <button
                            className="flex items-center justify-center gap-2 w-full m-1 py-1 px-2 text-[#E6E6E6] font-medium bg-blue-400 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                            onClick={() => handleEditTodo(todo._id)}
                        > <FaEdit />  Edit</button>

                        <button
                            className="flex items-center justify-center gap-2 w-full m-1 py-1 px-2 text-[#E6E6E6] font-medium bg-red-500 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                            onClick={() => handleDeleteTodo(todo._id)}
                        > <RiDeleteBin6Line /> Delete</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTodo
