import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"
import TodoView from "../components/TodoView"



const Home = () => {

    const { todos, todoInput, handleAddTodo, handleDeleteTodo, handleInputChange, setTodoView, setTodoViewActive, todoViewActive } = useContext(TodoContext)

    const handleAddTodoView = (todo) => {
        setTodoView(todo)
        setTodoViewActive(true)
    }

    return (
        <div className="relative w-full max-w-md px-2 md:px-0">
            {/* Heading Todo List */}
            <h1 className="text-center text-2xl font-bold text-[#E6E6E6] py-4">Todo List</h1>

            {/* Todo Content */}
            <div className="bg-[#ED985F] rounded-lg w-full  h-[600px] border border-green-600 p-2">

                <div className="bg-[#F7B980] w-full border rounded-lg py-1 px-1 flex flex-col gap-4 " >

                    {/* Search Bar */}
                    <input onChange={handleInputChange} className="px-2 flex-1 outline-none border font-medium rounded-lg bg-white" type="text"
                        value={todoInput.title} name='title'
                        placeholder="Add Title..." />

                    {/* description Box */}
                    <textarea onChange={handleInputChange} className=" border px-2 rounded-lg bg-white font-medium" placeholder="Description" name='description' value={todoInput.description}>

                    </textarea>

                    {/* Date and Time selection for deadline */}
                    <div>
                        <input onChange={handleInputChange} className="bg-white text-black font-medium px-2  rounded-lg" type="date" name='date' value={todoInput.date} />
                    </div>

                    <button onClick={handleAddTodo} className="bg-[#001F3D] text-[#E6E6E6] font-medium py-1 px-2 rounded-lg" >Add Todos</button>
                </div>


                {/* Todos list */}
                <div className=" flex  flex-col gap-4 mt-4 h-[520px] overflow-y-auto ">
                    {
                        todos.length === 0 ? (
                            <p>No Todos</p>
                        ) : (
                            todos.sort((a, b) => new Date(a.date) - new Date(b.date)).map((todo, index) => (
                                <div key={index} className="bg-[#F7B980] flex py-1 px-2 rounded-lg " onClick={() => handleAddTodoView(todo)} >
                                    <p className="flex-1 font-medium text-lg" >{todo.title}</p>
                                    <button onClick={() => handleDeleteTodo(index)} className="bg-[#001F3D] text-[#E6E6E6] font-medium py-1 px-2 rounded-lg" >Delete</button>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>


            {todoViewActive && <>

                {/* Backdrop blur */}
                <div className="absolute inset-0 bg-black opacity-90" >

                </div>

                <div>
                    <TodoView />
                </div>
            </>
            }

        </div>

    )
}

export default Home