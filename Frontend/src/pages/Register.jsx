import { useState } from 'react'
import { FaEye, FaUserAlt, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const Register = () => {

    const navigate = useNavigate();

    const backendURL = import.meta.env.VITE_BACKEND_URL;


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            return toast.error('All fields are required')
        }

        setLoading(true);
        
        try {
            const response = await axios.post(`${backendURL}/api/auth/create-user`, user);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/verify-otp', { state: { email: user.email } })
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-11 w-full max-w-lg mx-2  py-24 px-2 bg-[#F7B980] rounded-lg' >

            {loading && <Loading text="Registering your account..." />}

            <h2 className='text-3xl font-medium text-black ' >Create an Account</h2>

            {/* Name Input */}
            <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
                <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none ' type="text" placeholder="Enter your full name" name='name' value={user.name} onChange={handleOnChange} />

                <FaUserAlt className='m-3 text-xl' />
            </div>

            {/* Email Input */}
            <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
                <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none ' type="email" placeholder="Enter your email" name='email' value={user.email} onChange={handleOnChange} />

                <FaUserAlt className='m-3 text-xl' />
            </div>

            {/* Password Input */}
            <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
                <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none  ' type={showPassword ? 'text' : "password"} placeholder="Set password" name='password' value={user.password} onChange={handleOnChange} />

                {showPassword ? (
                    <FaEyeSlash className='m-3 text-xl cursor-pointer' onClick={() => setShowPassword(false)} />
                ) : (
                    <FaEye className='m-3 text-xl cursor-pointer' onClick={() => setShowPassword(true)} />
                )}
            </div>

            {/* Login button */}

            <button type="submit" disabled={loading} className='w-full px-6  py-3 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] '  >{loading ? "Registering..." : "Register"}</button>

            {/* New account and forget password */}
            <div className='flex flex-col justify-between items-center gap-3 ' >
                <p className='text-sm ' >Allready have an Account? <span className='underline cursor-pointer ' onClick={() => navigate('/login')} >Login</span> </p>
                <p className='text-sm' >Forget Password? <span className='underline cursor-pointer ' onClick={() => navigate('/forget-password')} >Reset</span> </p>
            </div>
        </form>
    )
}

export default Register
