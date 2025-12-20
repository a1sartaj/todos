import { createContext, useEffect, useState } from "react";


// Create Todo Context
export const TodoContext = createContext();


// Todo Context Provider
export const TodoProvider = ({ children }) => {


    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])
    const [todoInput, setTodoInput] = useState({
        title: "",
        description: "",
        date: "",
    })

    // Handle Add Todo
    const handleAddTodo = () => {

        console.log("Add Todo Clicked");

        if (todoInput.title.trim() === "") return;

        const newTodo = {
            title: todoInput.title,
            description: todoInput.description,
            date: todoInput.date,
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

    useEffect(() => {       
        console.log(todos);
    }, [todos])


    const value = {
        todos, setTodos,
        todoInput, setTodoInput,
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

