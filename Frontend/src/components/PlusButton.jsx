import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const PlusButton = () => {

    const navigate = useNavigate()

    return (
        //  Add Todo Button 
        <button className="fixed bottom-4 right-4 flex items-center justify-center  " onClick={() => navigate('/add-todo')} >
            <FaCirclePlus className="text-5xl rounded-full  transition-all duration-300 ease-in   shadow-white hover:text-white hover:shadow-[0_0_20px] cursor-pointer " />
        </button>

    )
}

export default PlusButton
