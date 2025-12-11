import { useEffect, useState } from "react"


const Home = () => {

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

    return (
        <div className="w-full max-w-md px-2 md:px-0">
            {/* Heading Todo List */}
            <h1 className="text-center text-2xl font-bold text-[#E6E6E6] py-4">Todo List</h1>

            {/* Todo Content */}
            <div className="bg-[#ED985F] rounded-lg w-full  h-[600px] border border-green-600 p-2">

                {/* Search Bar */}
                <div className="bg-[#F7B980] w-full border rounded-lg py-1 px-1 flex  " >
                    <input onChange={handleInputChange} className="flex-1 outline-none " type="text"
                        value={input}
                        placeholder="Add Todos..." />
                    <button onClick={handleAddTodo} className="bg-[#001F3D] text-[#E6E6E6] font-medium py-1 px-2 rounded-lg" >Add Todos</button>
                </div>


                {/* Todos list */}
                <div className=" flex  flex-col gap-4 mt-4 h-[520px] overflow-y-auto ">
                    {
                        todos.length === 0 ? (
                            <p>No Todos</p>
                        ) : (
                            todos.map((todo, index) => (
                                <div key={index} className="bg-[#F7B980] flex py-1 px-2 rounded-lg " >
                                    <p className="flex-1 font-medium text-lg" >{todo.text}</p>
                                    <button onClick={() => handleDeleteTodo(index)} className="bg-[#001F3D] text-[#E6E6E6] font-medium py-1 px-2 rounded-lg" >Delete</button>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Home