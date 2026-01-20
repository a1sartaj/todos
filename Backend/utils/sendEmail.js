import axios from "axios";

export const sendOTPEmail = async (to, otp) => {

    // Because I don't want to send otp in developement phase
    if (process.env.NODE_ENV === 'development') {
        return
    }

    try {
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Todo App",
                    email: "no-reply@a1sartaj.in",
                },
                to: [
                    {
                        email: to,
                    },
                ],
                subject: "Your OTP Code",
                htmlContent: `<h2>Your OTP Code</h2>
                              <p>Your OTP is <b>${otp}</b></p>
                               <p>Valid for 10 minutes.</p>`,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Email API error:", error.response?.data || error.message);
        throw new Error("Failed to send OTP email");
    }
};
