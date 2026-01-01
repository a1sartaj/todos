import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='fixed top-0 left-0 right-0  w-full  bg-[#ED985F]'>


            <div className='flex items-center justify-between max-w-[1440px]  h-[54px]  md:h-16 mx-auto' >
                <h2 className='kavoon text-lg md:text-2xl' >To-do a1Sartaj</h2>


                <nav>
                    <NavLink className={`hidden md:inline-block`} to="/">Home</NavLink>
                    <NavLink className={`hidden md:inline-block`} to="/add-todo">Add Todo</NavLink>
                </nav>

                <div>
                    <button>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar