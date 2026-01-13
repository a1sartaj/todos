import { transporter } from "../config/mail.js";
import UserModel from "../models/user.Model.js";
import { generateToken } from "../utils/generateToken.js";



// Create New User Controller
export const createUser = async (req, res) => {

    // console.log("Create User Called");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: "Invalid email address" })
    }

    try {

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }


        const OTP = Math.floor(100000 + Math.random() * 900000)

        const newUser = {
            name,
            email,
            password,
            otp: OTP,
            otpExpiry: Date.now() + 10 * 60 * 1000 // 10 minutes * 60 seconds * 1000 milliseconds
        }

        const createdUser = await UserModel.create(newUser);


        // Send OTP via Email Service with nodemailer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${OTP}. It is valid for 10 minutes.`
        })

        console.log("OTP sent to email:", email);

        return res.status(201).json({ success: true, message: "OTP sent successfully", user: createdUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Varify OTP Controller
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    // console.log("Verify OTP Called for email:", email);

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: "Invalid email address" })
    }

    try {

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User is already verified" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({ success: true, message: "User verified successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// Resend OTP Controller
export const resendOTP = async (req, res) => {
    const { email } = req.body;

    console.log("Resend OTP Called for email:", email);

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" })
    };

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User is already verified" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        user.otp = OTP;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your New OTP Code",
            text: `Your new OTP code is ${OTP}. It is valid for 10 minutes.`
        })

        return res.status(200).json({ success: true, message: "OTP resent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// Login User 
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: "Invalid email address" })

    }

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: "User is not verified" });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }


        const token = generateToken(user._id, res);

        return res.status(200).json({ success: true, message: "Login successful" });


    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to Login", error: error.message });
    }
}

// /me controller for getting logged in user details
export const getMe = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: 'Succeed to get me', user });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to get me", error: error.message });
    }
}