import UserModel from "../models/user.Model.js";



// Create New User Controller
export const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!email.includes('@')) {
        return res.status(400).json({ message: "Invalid email address" })
    }

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const existingUser = await UserModel.find({ email })
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = {
            name,
            email,
            password
        }

        const createdUser = await UserModel.create(newUser);
        return res.status(201).json({ message: "User created successfully", user: createdUser });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }

}