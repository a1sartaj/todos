import express from "express"
import 'dotenv/config'
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.Routes.js";
import todoRouter from "./routes/todo.Routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI || "http://localhost:5173",
    credentials: true,

}));

// Connect to Database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})