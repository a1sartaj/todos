import TodoModel from "../models/todo.Model.js";


// Create Todo Controller
export const createTodo = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;

    const dueDateObj = new Date(dueDate);
    // Converts dueDate string (e.g. "2026-01-09") into a Date object
    // Result: 2026-01-09T00:00:00.000Z (UTC midnight)

    const today = new Date();
    // Gets current date & time (e.g. 2024-06-10T14:48:00.000Z)

    today.setHours(0, 0, 0, 0);
    // Resets time to midnight (00:00:00) for date-only comparison
    // Result: 2024-06-10T00:00:00.000Z


    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized, User not found' }) 
    }

    if (dueDateObj < today) {
        return res.status(400).json({ success: false, message: 'Due date cannot be in the past' })
    }

    try {
        const newTodo = await TodoModel.create({
            title, description, dueDate, userId,
        })

        return res.status(201).json({ success: true, message: 'Todo created successfully', todo: newTodo })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Fetch All Todos
export const getAllTodos = async (req, res) => {
    const userId = req.user.id

    try {

        const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 }) // latest first

        return res.status(200).json({ success: true, message: 'Todo fetch successfully', todos })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// Fetch Single Todo
export const getSingleTodo = async (req, res) => {
    console.log("Get Single Todo Called")
    const { id } = req.params;
    const userId = req.user.id;

    try {

        const todo = await TodoModel.findOne({ _id: id, userId })

        if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' })

        return res.status(200).json({ success: true, message: 'Todo fetch successfully', todo })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Todo Toggle completed or not
export const toggleTodoStatus = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;


    try {

        const todo = await TodoModel.findOne({ _id: id, userId })

        if (!todo) {
            if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' })
        }

        // toggle isCompleted
        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        return res.status(200).json({ success: true, message: 'Todo status update', todo })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// Update Todo Function
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, dueDate } = req.body;

    const dueDateObj = new Date(dueDate);
    // Converts dueDate string (e.g. "2026-01-09") into a Date object
    // Result: 2026-01-09T00:00:00.000Z (UTC midnight)

    const today = new Date();
    // Gets current date & time (e.g. 2024-06-10T14:48:00.000Z)

    today.setHours(0, 0, 0, 0);
    // Resets time to midnight (00:00:00) for date-only comparison
    // Result: 2024-06-10T00:00:00.000Z


    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized, User not found' })
    }

    if (dueDateObj < today) {
        return res.status(400).json({ success: false, message: 'Due date cannot be in the past' })
    }

    try {

        const todo = await TodoModel.findOneAndUpdate({ _id: id, userId }, {
            title, description, dueDate,
        }, {
            new: true, // it return data after update, without it, return without update means old data
            runValidators: true, // it run validator like require true, without it. it skip validator like require true.
        })

        return res.status(200).json({ success: true, message: "Todo updated successfully", todo, })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed To Update Todo!", error: error.message });
    }
}

// Delete Todo Controller
export const deleteTodo = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id;

    try {

        const todo = await TodoModel.findOneAndDelete({ _id: id, userId })

        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo Not Found' })
        }

        return res.status(204).json({ success: true, message: 'Todo deleted successfully' })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed To Delete Todo!", error: error.message });
    }
}