import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";



const UserDropdown = ({ user, onLogout }) => {
    // const { user, logout } = props
    const [open, setOpen] = useState(false)
    const dropDownRef = useRef(null)

    useEffect(() => {
        // console.log(dropDownRef.current)
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => removeEventListener('mousedown', handleClickOutside)
    }, [])


    return (
        <div className='relative' ref={dropDownRef} >
            {/* Button  */}
            <div onClick={() => setOpen(!open)} className='flex items-center justify-center rounded-full bg-gray-300' >
                <div className='flex items-center justify-center w-9 h-9 text-2xl font-semibold text-[#E6E6E6] bg-blue-400 rounded-full transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer'> {user.name[0]} </div>

                <IoMdArrowDropdown />
            </div>

            {open && (
                <div className='absolute flex flex-col items-center justify-center gap-2 right-0 top-10 bg-white p-2 rounded-lg' >
                    {/* Top field image, name and email */}
                    <div className='flex gap-1 items-center justify-center'>
                        {/* left image */}
                        <div className='flex items-center justify-center w-12 h-12 text-3xl text-white font-medium rounded-full bg-blue-400' >
                            {user.name[0]}
                        </div>

                        {/* right side name and email */}
                        <div>
                            <h4 className='text-lg font-medium' >{user.name}</h4>
                            <p className='text-base text-gray-400' >{user.email}</p>
                        </div>
                    </div>

                    {/* Bar */}
                    <div className='w-full border border-gray-400 ' ></div>

                    <p className='flex  gap-2 items-center w-full text-base text-gray-400 cursor-pointer hover:text-black transition-all ease-in'> <MdOutlineDriveFileRenameOutline /> Change Name</p>
                    <p className='flex  gap-2 items-center w-full text-base text-gray-400 cursor-pointer hover:text-black transition-all ease-in'> <RiLockPasswordFill /> Change Password</p>

                    {/* Bar */}
                    <div className='w-full border border-gray-400 ' ></div>


                    <button className='w-full  py-2 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] ' onClick={onLogout} >Logout</button>
                </div>
            )}



        </div>
    )
}

export default UserDropdown
