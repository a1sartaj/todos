import React from 'react'

const Loading = ({ text = "Please wait..." }) => {
    return (
        <div className='fixed inset-0 z-20 flex items-center justify-center gap-4 bg-black/70 ' >

            {/* Spinner with border animation */}
            <div className='w-10 h-10 border-4   border-gray-400 border-t-red-500  rounded-full animate-spin' ></div>

            {/* Text */}
            <p className='text-xl font-medium text-white  cursor-not-allowed' >{text}</p>
        </div>
    )
}

export default Loading
