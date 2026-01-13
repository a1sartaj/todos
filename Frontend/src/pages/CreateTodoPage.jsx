import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../components/Loading";
import { TodoContext } from "../context/TodoContext";

const CreateTodoPage = () => {

    const [todoInput, setTodoInput] = useState(sessionStorage.getItem('todoInputDraft') ? JSON.parse(sessionStorage.getItem('todoInputDraft')) : {
        title: "",
        description: "",
        dueDate: "",
    });

    const [loading, setLoading] = useState(false);
    const { todos, setTodos } = useContext(TodoContext)



    // Handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTodoInput((prev) => ({ ...prev, [name]: value }));
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!todoInput.title.trim()) {
            return toast.error("Title is required");
        }

        const dueDateObj = new Date(todoInput.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dueDateObj < today) {
            return toast.error("Due date cannot be in the past");
        }

        try {
            setLoading(true)

            const response = await axiosInstance.post(`/api/todos/create-todo`, todoInput,)

            if (response.data.success) {
                toast.success(response.data.message);
                setTodos([...todos, response.data.todo])
                setTodoInput({
                    title: "",
                    description: "",
                    dueDate: "",
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        } finally {
            setLoading(false)
        }
    };

    // Har text to session storage me store karta hai jo tab ya app close hone par clear ho jata hai
    useEffect(() => {
        sessionStorage.setItem('todoInputDraft', JSON.stringify(todoInput))
    }, [todoInput])

    
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 w-full max-w-lg mx-2 py-24 px-4 bg-[#F7B980] rounded-lg"
        >


            {loading && <Loading />}

            {/* Heading */}
            <h2 className="text-3xl font-medium text-black">
                Create a Todo
            </h2>

            {/* Title */}
            <input
                type="text"
                name="title"
                value={todoInput.title}
                onChange={handleOnChange}
                placeholder="Add title..."
                className="w-full h-11 px-3 text-lg bg-white rounded-lg outline-none"
            />

            {/* Description */}
            <textarea
                name="description"
                value={todoInput.description}
                onChange={handleOnChange}
                placeholder="Add description..."
                className="w-full min-h-[100px] px-3 py-2 bg-white rounded-lg outline-none "
            />

            {/* Due Date (FIXED) */}
            <div className="w-full flex flex-col gap-1">
                <label
                    htmlFor="dueDate"
                    className="text-sm font-medium text-black"
                >
                    Due Date
                </label>

                <input
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={todoInput.dueDate}
                    onChange={handleOnChange}
                    min={new Date().toISOString().split("T")[0]} // User cannot select past dates (yyyy-mm-ddThh:mm:ss.sssZ) to (yyyy-mm-dd);
                    className="w-full h-11 px-3 bg-white rounded-lg outline-none "
                />

            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                aria-label="Create Todo"
                className="w-full h-11 px-6 text-white bg-black rounded-lg transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed "
            >
                Add Todo
            </button>
        </form>
    );
};

export default CreateTodoPage;
