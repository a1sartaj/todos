import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, } from "react-router-dom";
import Loading from "../components/Loading";


const OtpPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // const email = 'sartaj9806@gmail.com'; // Replace with actual email from location state

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [otp, setOpt] = useState('')
    const [timeLeft, setTimeLeft] = useState(60)
    const [canResend, setCanResend] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("OTP Submitted:", otp);

        if (!otp) {
            return toast.error("Please enter the otp");
        }

        setLoading(true)

        try {


            const response = await axios.post(`${backendURL}/api/auth/verify-otp`, {
                otp: otp,
                email: location.state.email
                // email,
            })

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {

            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
            console.error("Error verifying OTP:", error);

        } finally {
            setLoading(false)
        }

    }

    const handleOnChange = (e) => {
        setOpt(e.target.value);
    }

    const handleResendOtp = async () => {
        console.log("Resend OTP clicked");
        setLoading(true)

        setCanResend(false);
        setTimeLeft(60);

        try {


            const response = await axios.post(`${backendURL}/api/auth/resend-otp`, {
                email: location.state.email
                // email,
            })

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000)

        return () => clearInterval(timer);

    }, [timeLeft])

    useEffect(() => {
        if (!location.state || !location.state.email) {
            navigate('/register');
        }
    })

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-11 w-full max-w-lg mx-2  py-24 px-2 bg-[#F7B980] rounded-lg">

            {loading && <Loading text="Verifying Otp..." />}

            <div className="w-full  text-lg  bg-white rounded-lg" >
                <input className="w-full p-3 text-lg outline-none rounded-lg  " type="text" placeholder="Enter Otp" onChange={handleOnChange} value={otp} />
            </div>

            <button type="submit" disabled={loading} className='w-full px-6  py-3 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] '  >{loading ? "Verifying..." : "Verify Otp"}</button>

            <button disabled={!canResend} className={`text-sm ${canResend ? 'text-blue-800 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`} type="button" onClick={handleResendOtp}   >
                Resend Otp {timeLeft > 0 ? `in ${timeLeft} sec` : ''}
            </button>

        </form>
    )
}

export default OtpPage
