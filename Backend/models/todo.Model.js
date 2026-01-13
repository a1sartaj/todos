import mongoose from 'mongoose'


const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        }, 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'users',
        }

    }, { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

const TodoModel = mongoose.model('todos', todoSchema);

export default TodoModel;