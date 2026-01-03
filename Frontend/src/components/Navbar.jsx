import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import MobileMenu from './MobileMenu';

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false)
    }

    return (
        <div className='sticky z-10 top-0 left-0 right-0 bg-[#ED985F] drop-shadow-black/25 drop-shadow-[0px_2px_4px]'>


            {/* View Port 1440px  */}
            <div className='flex items-center justify-between h-[54px] md:h-16 max-w-[1440px] mx-1 xl:mx-auto transition-all duration-300 ease-in' >

                {/* Logo */}
                <h2 className='kavoon text-lg md:text-2xl transition-all duration-300 ease-in ' >To-do a1Sartaj</h2>

                {/* Nav link */}
                <nav className='flex gap-16 text-lg' >
                    <NavLink
                        to="/"
                        className={({ isActive }) => `hidden md:inline-block  transition-all duration-300 ease-in hover:underline ${isActive && 'underline'}`}
                    >Home</NavLink>

                    <NavLink
                        to="/add-todo"
                        className={({ isActive }) => `hidden md:inline-block  transition-all duration-300 ease-in hover:underline ${isActive && 'underline'}`}
                    >Add Todo</NavLink>
                </nav>


                {/* Button and hamburger bar */}
                <div className='flex items-center justify-between gap-2' >
                    <button className='px-6  py-2 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] ' >Login</button>

                    <button
                        aria-label="Open menu"
                        className="md:hidden p-2 rounded-md hover:bg-gray-200 active:scale-95 transition "
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <FaXmark className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>

                </div>


                <MobileMenu isOpen={open} onClose={onClose} />

            </div>

        </div>
    )
}

export default Navbar