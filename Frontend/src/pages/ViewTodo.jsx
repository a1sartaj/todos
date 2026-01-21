import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../context/TodoContext';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDelete from '../components/ConfirmDelete';
import axiosInstance from '../utils/axiosInstance';
import Loading from '../components/Loading';
import { formatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';



const ViewTodo = () => {

    const todoId = useParams().id;
    const { todos, setTodos } = useContext(TodoContext)
    const [todo, setTodo] = useState({});
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const fetchedTodo = async () => {
        const foundTodo = todos.find(t => t._id.toString() === todoId.toString());

        if (foundTodo) {
            setTodo(foundTodo)
            return
        }

        // If Data is not available in todos then fetch from backend side.
        try {
            setLoading(true)

            const response = await axiosInstance.get(`/api/todos/get-single-todo/${todoId}`)

            setTodo(response.data.todo)


        } catch (error) {
            setTodo(null)
        } finally {
            setLoading(false)
        }
    }


    const handleToggleCompleted = async () => {
        console.log("Toggle handle called")
        try {
            setLoading(true)

            const response = await axiosInstance.patch(`/api/todos/todo-status-update/${todoId}`)
            setTodo(response.data.todo)

            if (response.data.success) {
                const updateToggleTodo = todos.map((t) => {
                    if (t._id.toString() === todoId.toString()) {
                        return { ...t, isCompleted: !t.isCompleted }
                    }

                    return t;
                })

                setTodos(updateToggleTodo)
            }


            // both run perfect
            // setTodos(prev => prev.map(t => t._id.toString() === todoId.toString() ? {...t, isCompleted : !t.isCompleted} : t))

        } catch (error) {
            console.log("Catch block run")
            console.log(error)
            setTodo(null)
        } finally {
            setLoading(false)
        }
    }

    // it will navigate to edit todo page
    const handleEditTodo = async () => {
        navigate(`/edit-todo/${todoId}`)
    }

    const handleDeleteTodo = async () => {

        try {
            setLoading(true)

            const response = await axiosInstance.delete(`/api/todos/delete-todo/${todoId}`)

            setTodos(prev => prev.filter(todo => todo._id !== todoId))
            toast.success('Todo deleted successfully')
            navigate('/')

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }


    useEffect(() => {
        fetchedTodo();
    }, [])

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-2 py-2 px-4 bg-[#F7B980] rounded-lg">

            {/* Confirm Before Delete */}
            {showConfirmDelete && (
                <ConfirmDelete
                    onCancel={() => setShowConfirmDelete(false)}
                    onConfirm={() => {
                        handleDeleteTodo(todo._id);
                        setShowConfirmDelete(false);
                    }}
                />
            )}

            {/* Loading Component */}
            {loading && <Loading />}

            {/* Content Box */}
            <div className='w-full' >
                {/* Title and mark completed toggle */}
                <div className='flex item-start gap-2  px-2 pb-2 mb-2 border-b' >
                    {/* Title */}
                    <h2 className=' flex-1 text-2xl font-medium ' >{todo.title}</h2>

                    {/* Toggle Button Content*/}
                    <div className='flex items-start gap-2 mt-1' >
                        <p className=' text-xs text-gray-500' >{todo.isCompleted ? "Completed" : "Not Completed"}</p>

                        {/* Toggle Button */}
                        <div className={` flex items-center w-7 h-4  rounded-full ${todo.isCompleted ? "bg-green-500" : "bg-white"} transition-all duration-300  cursor-pointer `} onClick={handleToggleCompleted}  >
                            <div className={`w-3 h-3 rounded-full ${todo.isCompleted ? "ml-3.5 bg-white" : "ml-0.5 bg-green-500"} transition-all duration-300  `} ></div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {todo.description && <p className='px-2 mb-4 text-lg  text-gray-700 leading-6' >{todo.description}</p>}

                {/* Due Date */}
                {todo.dueDate && <p className='px-2 text-xs text-gray-400'>Due Date : {formatDate(todo.dueDate)}</p>}

                {/* Buttons Section */}
                <div className='flex items-center justify-between pt-2 mt-2 border-t border-gray-500  ' >
                    <button
                        className="flex items-center justify-center gap-2 w-full m-1 py-1 text-[#E6E6E6] bg-blue-400 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                        onClick={() => handleEditTodo(todo._id)}
                    > <FaEdit />  Edit</button>

                    <button
                        className="flex items-center justify-center gap-2 w-full m-1 py-1 text-[#E6E6E6] bg-red-500 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                        onClick={() => setShowConfirmDelete(true)}
                    > <RiDeleteBin6Line /> Delete</button>

                </div>
            </div>
        </div>
    )
}

export default ViewTodo
