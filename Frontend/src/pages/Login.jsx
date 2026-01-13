import axios from 'axios';
import { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { TodoContext } from '../context/TodoContext';


const Login = () => {

  // Hooks
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useContext(AuthContext)
  const { fetchAllTodos } = useContext(TodoContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Constant
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Handles
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      return toast.error("All fields are required")
    }

    setLoading(true)

    try {
      const response = await axios.post(`${backendURL}/api/auth/login-user`, user, {
        withCredentials: true,
      })


      if (response.data.success) {
        toast.success(response.data.message)
        await fetchUser();
        await fetchAllTodos();
        navigate(from, { replace: true });
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage)
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className='flex flex-col items-center gap-11 w-full max-w-lg mx-2  py-24 px-2 bg-[#F7B980] rounded-lg ' >

      <h2 className='text-3xl font-medium text-black ' >Login</h2>

      {loading && <Loading text='Logging...' />}


      {/* Email Input */}
      <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
        <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none ' type="email" placeholder="Email" name='email' onChange={handleOnChange} value={user.email} />

        <FaUserAlt className='m-3 text-xl' />
      </div>

      {/* Password Input */}
      <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
        <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none  ' type={showPassword ? 'text' : "password"} placeholder="Password" name='password' onChange={handleOnChange} value={user.password} />

        {showPassword ? (
          <FaEyeSlash className='m-3 text-xl cursor-pointer' onClick={() => setShowPassword(false)} />
        ) : (
          <FaEye className='m-3 text-xl cursor-pointer' onClick={() => setShowPassword(true)} />
        )}
      </div>

      {/* Login button */}

      <button type="submit" disabled={loading} className='w-full px-6  py-3 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] '  >Login</button>

      {/* New account and forget password */}
      <div className='flex flex-col justify-between items-center gap-3 ' >
        <p className='text-sm ' >New Account? <span className='underline cursor-pointer ' onClick={() => navigate('/register')} >Register</span> </p>
        <p className='text-sm' >Forget Password? <span className='underline cursor-pointer ' onClick={() => navigate('/forget-password')} >Reset</span> </p>
      </div>
    </form>
  )
}

export default Login
