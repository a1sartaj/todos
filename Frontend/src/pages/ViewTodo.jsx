import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../context/TodoContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const ViewTodo = () => {

    const todoId = useParams().id;
    const navigate = useNavigate();
    const { todos } = useContext(TodoContext)
    const [todo, setTodo] = useState({});
    const fetchedTodo = () => {
        const foundTodo = todos.find(t => t._id.toString() === todoId.toString());
        setTodo(foundTodo);
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
                <div className='w-[90%] py-2 bg-[#F7B980] rounded-lg' >
                    <h2 className='pl-2 pb-0.5 mb-2 text-2xl font-bold border-b' >{todo.title}</h2>
                    <p className='pl-2 mb-2 text-lg font-medium text-gray-700 leading-6' >{todo.description}</p>
                    <p className='pl-2 text-sm text-gray-400'>Deadline : {todo.date}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewTodo
