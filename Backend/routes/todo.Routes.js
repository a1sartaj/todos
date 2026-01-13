import express from 'express';
import { authMiddleware } from '../middlewares/auth.Middleware.js';
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, toggleTodoStatus, updateTodo } from '../controllers/todo.Controllers.js';

const todoRouter = express.Router();

todoRouter.post('/create-todo', authMiddleware, createTodo)
todoRouter.get('/get-all-todos', authMiddleware, getAllTodos)
todoRouter.get('/get-single-todo/:id', authMiddleware, getSingleTodo)
todoRouter.patch('/todo-status-update/:id', authMiddleware, toggleTodoStatus) // Patch use for only single field update
todoRouter.put('/update-todo/:id', authMiddleware, updateTodo)
todoRouter.delete('/delete-todo/:id', authMiddleware, deleteTodo)


export default todoRouter;