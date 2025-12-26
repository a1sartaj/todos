import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const AddTodo = () => {

    const { todoInput, handleInputChange, handleAddTodo } = useContext(TodoContext)
    const navigate = useNavigate();

    return (
        <div className="relative w-full max-w-md px-2 md:px-0">

            {/* Back Button */}
            <button className='absolute top-4 left-4 flex items-center justify-center   ' onClick={() => navigate(-1)}  >
                <IoMdArrowRoundBack className="text-5xl text-[#ED985F] rounded-full  transition-all duration-300 ease-in   shadow-white bg-black  hover:bg-white hover:shadow-[0_0_20px] cursor-pointer " />
            </button>

            {/* Full Section */}
            <div className="flex items-center justify-center bg-[#ED985F] rounded-lg w-full  h-[600px]  p-2" >

                {/* Todo Input Section */}
                <form className=" flex flex-col gap-4 w-[90%] p-2 bg-[#F7B980] rounded-lg " onSubmit={handleAddTodo} >

                    {/* Title Box */}
                    <input onChange={handleInputChange} className="px-2 py-2 flex-1 outline-none  font-medium rounded-lg bg-white" type="text"
                        value={todoInput.title} name='title'
                        placeholder="Add Title..." />

                    {/* description Box */}
                    <textarea onChange={handleInputChange} className="  px-2 py-2 rounded-lg bg-white font-medium outline-none " placeholder="Description" name='description' value={todoInput.description} />

                    {/* Date and Time selection for deadline */}
                    <div>
                        <input onChange={handleInputChange} className="px-2 py-2 text-black font-medium bg-white rounded-lg outline-none" type="date" name='date' value={todoInput.date} />
                    </div>

                    <button type='submit' className="px-2 py-2 font-medium text-[#E6E6E6]  bg-[#001F3D] rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer " >Add Todos</button>
                </form>
            </div>
        </ div>
    )
}

export default AddTodo;