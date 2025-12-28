import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";



const Home = () => {

    const { todos, handleDeleteTodo, } = useContext(TodoContext)

    const navigate = useNavigate();

    return (
        <div className="relative w-full max-w-md px-2 md:px-0">

            {/* Todo Content */}
            <div className="bg-[#ED985F] rounded-lg w-full  h-[600px]  p-2">

                {/* Todos list */}
                <div className=" flex  flex-col gap-4 mt-4 h-[520px] overflow-y-auto ">
                    {
                        todos.length === 0 ? (
                            <Link
                                to='/add-todo'
                                className="flex items-center justify-center w-full h-full cursor-pointer text-center font-medium text-lg  hover:underline "
                            >No todos yet. Click + to add one.</Link>
                        ) : (
                            todos.sort((a, b) => new Date(a.date) - new Date(b.date)).map((todo, index) => (
                                <div key={index} className={`flex items-center  pl-2 bg-[#F7B980] rounded-lg hover:shadow cursor-pointer ${todo.isCompleted ? 'opacity-50' : ''}`}  >
                                    <p className="flex-1 py-1 font-medium text-lg  " onClick={() => navigate(`/view-todo/${todo._id}`)} >{todo.title}</p>
                                    <button className="flex items-center justify-center gap-1 m-1 py-1 px-2 text-[#E6E6E6] font-medium bg-red-500 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                                        onClick={() => handleDeleteTodo(todo._id)} > <RiDeleteBin6Line /> Delete</button>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>

            {/* Add Todo Button */}
            <button className="absolute bottom-4 right-4 flex items-center justify-center  " onClick={() => navigate('/add-todo')} >
                <FaCirclePlus className="text-5xl rounded-full  transition-all duration-300 ease-in   shadow-white hover:text-white hover:shadow-[0_0_20px] cursor-pointer " />
            </button>
        </div>

    )
}

export default Home