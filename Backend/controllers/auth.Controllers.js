import UserModel from "../models/user.Model.js";
import { generateToken } from "../utils/generateToken.js";
import { sendOTPEmail } from "../utils/sendEmail.js";



// Create New User Controller
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (user && user.isVerified) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        // User exists but not verify
        if (user && !user.isVerified) {
            if (user.otpExpiry > Date.now()) {
                return res.status(200).json({ success: true, message: "OTP already sent" });
            }
            return await resendOTP(req, res)
        }

        // Generate OTP
        const OTP = Math.floor(100000 + Math.random() * 900000);

        // SEND EMAIL FIRST
        try {
            await sendOTPEmail(email, OTP)
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP. Please try again later.",
            });
        }


        // 🔹 SAVE USER ONLY IF EMAIL SENT
        const createdUser = await UserModel.create({
            name,
            email,
            password,
            otp: OTP,
            otpExpiry: Date.now() + 10 * 60 * 1000,
        });

        return res.status(201).json({ success: true, message: "OTP sent successfully", });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error", error: error.message, });
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
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User is already verified" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        try {
            await sendOTPEmail(email, OTP)
        } catch (error) {
            return res.status(502).json({ success: false, message: 'Failed to send OTP, Please try again later.' })
        }

        user.otp = OTP;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

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
            return res.status(403).json({ success: false, message: "User is not verified" });
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

// Forget Password Controller
export const forgetPassword = async (req, res) => {


    const { email } = req.body;
    console.log('Forget Password Called: ', email)


    if (!email) {
        return res.status(400).json({ success: false, message: 'Please enter email' })
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email' })
    }

    try {

        const user = await UserModel.findOne({ email });


        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: "User is not verified" });
        }

        // Genereate OTP
        const OTP = Math.floor(100000 + Math.random() * 999999)

        // First send OTP
        try {

            await sendOTPEmail(email, OTP);

        } catch (error) {
            return res.status(502).json({ success: false, message: 'Failed to send OTP, Please try again later.' })
        }

        user.otp = OTP
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to forget password' })
    }

}

// Forget password verify OTP 
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // console.log("email : ", email, " otp : ", otp, ' newPassword : ', newPassword)

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email' })
    }

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP Expired' })
        }

        user.otp = null
        user.otpExpiry = null
        user.password = newPassword;
        await user.save()

        return res.status(200).json({ success: true, message: "New password added successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to reset password' })
    }
}

