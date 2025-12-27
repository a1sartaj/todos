import { createContext, useEffect, useState } from "react";


// Create Todo Context
export const TodoContext = createContext();


// Todo Context Provider
export const TodoProvider = ({ children }) => {


    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])
    const [todoView, setTodoView] = useState(null)
    const [todoViewActive, setTodoViewActive] = useState(false)
    const [todoInput, setTodoInput] = useState({
        title: "",
        description: "",
        date: "",
    })

    // Handle Add Todo
    const handleAddTodo = (e) => {
        e.preventDefault();

        if (todoInput.title.trim() === "") return;

        const newTodo = {
            _id: Date.now(),
            title: todoInput.title,
            description: todoInput.description,
            date: todoInput.date,
            isCompleted: false,
        }

        setTodos([...todos, newTodo])
        setTodoInput({ title: "", description: "", date: "" })

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
        const { name, value } = e.target;
        setTodoInput({ ...todoInput, [name]: value })
    }

    // Task Completed Toggle Effect
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])


    const value = {
        todos, setTodos,
        todoInput, setTodoInput,
        todoView, setTodoView,
        todoViewActive, setTodoViewActive,
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

