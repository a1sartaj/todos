import { createContext, useEffect, useState } from "react";


// Create Todo Context
export const TodoContext = createContext();


// Todo Context Provider
export const TodoProvider = ({ children }) => {


    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])
    const [input, setInput] = useState("")

    // Handle Add Todo
    const handleAddTodo = () => {

        console.log("Add Todo Clicked");

        if (input.trim() === "") return;

        const newTodo = {
            text: input,
            completed: false
        }

        setTodos([...todos, newTodo])
        setInput("")

        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
    }

    // Handle Delte Todo
    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((todo, i) => i !== index)
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    // Handle Input Change
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        console.log(input);
    }, [input])


    const value = {
        todos, setTodos,
        input, setInput,
        handleAddTodo,
        handleDeleteTodo,
        handleInputChange,
    }

    return (
        <TodoContext.Provider value={value} >
            {children}
        </TodoContext.Provider>
    )
}

