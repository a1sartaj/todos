import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import PlusButton from "../components/PlusButton";
import { formatDate } from "../utils/formatDate";



const Home = () => {

    const { todos, } = useContext(TodoContext)

    const navigate = useNavigate();

    return (
        <>
            {/* Todos list */}
            {/* <div className=" flex flex-col gap-2 p-2   overflow-y-auto h-screen w-full "> */}
            <div className="flex flex-col gap-2 p-2 w-full">
                {
                    todos.length === 0 ? (
                        <Link
                            to='/create-todo'
                            className="flex items-center justify-center w-full h-full cursor-pointer text-center font-medium text-lg  hover:underline  "
                        >No todos yet. Click + to add one.</Link>
                    ) : (
                        todos.sort((a, b) => new Date(a.date) - new Date(b.date)).map((todo, index) => (
                            <div key={index} className={`flex items-center p-2.5 pl-6  bg-[#F7B980] rounded-lg transition-all duration-300 ease-in hover:shadow hover:scale-[99%] cursor-pointer ${todo.isCompleted ? 'opacity-50' : ''}`}  >

                                <div className="flex flex-col flex-1  " onClick={() => navigate(`/view-todo/${todo._id}`)}  >
                                    <h3 className="text-lg  " >{todo.title}</h3>

                                   {todo.dueDate &&  <p className="text-[#9C9696] text-[12px]" >Due : {formatDate(todo.dueDate)}</p>}
                                </div>

                                {/* Done Button */}
                                <button className="flex items-center justify-center gap-1 px-6 py-2 text-[#E6E6E6] text-lg bg-red-500 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer"
                                > <RiDeleteBin6Line /> Done</button>
                            </div>
                        ))
                    )
                }
            </div>


            {/* Plus button for add todos */}
            <PlusButton />
        </>

    )
}

export default Home