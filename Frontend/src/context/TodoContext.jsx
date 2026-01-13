import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";


// Create Todo Context
export const TodoContext = createContext();

// Todo Context Provider
export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAllTodos = async () => {

        try {
            const response = await axiosInstance.get('/api/todos/get-all-todos')
            setTodos(response.data.todos)

        } catch (error) {
            setTodos([])
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchAllTodos()
    }, [])

    const value = {
        todos, setTodos,
        loading, setLoading,
        fetchAllTodos,
    }

    return (
        <TodoContext.Provider value={value} >
            {children}
        </TodoContext.Provider>
    )
}

