import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Create Todo Context
export const TodoContext = createContext();


// Todo Context Provider
export const TodoProvider = ({ children }) => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])
    const [todoView, setTodoView] = useState(null)
    const [todoViewActive, setTodoViewActive] = useState(false)
    const [todoInput, setTodoInput] = useState({
        title: "",
        description: "",
        date: "",
    }) // Input state for add and edit todo forms



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
        console.log("Add Todo Called");

        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
    }

    // Handle Delte Todo
    const handleDeleteTodo = (id) => {
        console.log("Delete Todo Called");
        const newTodos = todos.filter(todo => todo._id !== id)
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        navigate(-1);
    }

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTodoInput({ ...todoInput, [name]: value })
    }

    //  Handle Edit Todo
    const handleEditTodo = (id) => {
        const updatedTodos = todos.map(todo => todo._id.toString() === id.toString() ? { ...todo, title: todoInput.title, description: todoInput.description, date: todoInput.date } : todo)
        setTodos(updatedTodos)
        navigate(`/view-todo/${id}`);
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
        handleEditTodo,
    }

    return (
        <TodoContext.Provider value={value} >
            {children}
        </TodoContext.Provider>
    )
}

