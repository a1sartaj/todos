import React from 'react'
import { FaXmark } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <div
            className={`
        fixed inset-0 z-50 md:hidden
        bg-[#ED985F]
        transition-transform duration-300 ease-out min-h-40
        ${isOpen ? 'translate-y-0' : '-translate-y-full'}
      `}
        >
            {/* Close button */}
            <button
                className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 active:scale-95 transition"
                onClick={onClose}
                aria-label="Close menu"
            >
                <FaXmark className="text-2xl" />
            </button>

            {/* Navigation */}
            <nav className="flex h-full flex-col items-center justify-center gap-4 text-lg">
                <NavLink
                    to="/"
                    onClick={onClose}
                    className={({ isActive }) =>
                        `
              transition-all duration-300 ease-in
              hover:underline
              ${isActive ? 'underline' : ''}
            `
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/add-todo"
                    onClick={onClose}
                    className={({ isActive }) =>
                        `
              transition-all duration-300 ease-in
              hover:underline
              ${isActive ? 'underline' : ''}
            `
                    }
                >
                    Add Todo
                </NavLink>
            </nav>
        </div>
    )
}

export default MobileMenu
