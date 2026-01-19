import { useEffect, useState } from 'react'
import { FaEye, FaUserAlt, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import axiosInstance from '../utils/axiosInstance';

const ForgetPassword = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    otp: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1)
  const [canResend, setCanResend] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  // Use for update new password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    console.log('handleResendOtp')

    if (!user.email || !user.otp || !user.password) {
      return toast.error('All fields are required')
    }

    try {

      setLoading(true)
      const response = await axiosInstance.post('/api/auth/reset-password', {
        email: user.email,
        otp: user.otp,
        newPassword: user.password
      })

      toast.success(response.data.message)
      setStep(1)
      navigate('/login')

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to forget password222'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }

  }

  // Use for sending otp to user with their email
  const forgetPassword = async () => {

    if (!user.email) {
      return toast.error('Please Enter Email.')
    }

    setCanResend(false)

    console.log('forgetPassword called')

    try {

      setLoading(true)

      const response = await axiosInstance.post('/api/auth/forget-password', user)

      toast.success(response.data.message)
      setStep(2)
      setTimeLeft(60)

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to forget password222'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000);

    return () => clearTimeout(timer) // Clear timeout

  }, [timeLeft])

  return (
    <form onSubmit={handleResetPassword} className='flex flex-col items-center gap-11 w-full max-w-lg mx-2  py-24 px-2 bg-[#F7B980] rounded-lg' >

      {loading && <Loading text="Please wait..." />}

      <h2 className='text-3xl font-medium text-black ' >Forget Password</h2>

      {/* Email Input */}
      <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
        <input required className='w-full  p-3 text-lg  bg-white rounded-lg outline-none ' type="email" placeholder="Enter your email" name='email' value={user.email} onChange={handleOnChange} />

        <FaUserAlt className='m-3 text-xl' />
      </div>


      {
        step === 2 && (
          <>
            {/* OTP Input */}
            <div className='flex items-center justify-between w-full  bg-white rounded-lg'  >
              <input className='w-full  p-3 text-lg  bg-white rounded-lg outline-none ' type="text" placeholder="Enter otp" name='otp' value={user.otp} onChange={handleOnChange} />

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
          </>
        )
      }





      {
        step === 1 ? (

          // Send OTP Button
          <button disabled={loading} onClick={forgetPassword} className='w-full px-6  py-3 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] '  >Send OTP</button>
        ) : (
          // Reset Password Button
          <button type="submit" disabled={loading} className='w-full px-6  py-3 text-white bg-[#FB2C36] rounded-lg transition-all duration-300 ease-in cursor-pointer hover:text-black hover:bg-white shadow-white hover:shadow-[0_0_10px] '  >Reset Password</button>
        )
      }



      {
        step === 2 && (
          <button disabled={!canResend} className={`text-sm ${canResend ? 'text-blue-800 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`} type="button" onClick={forgetPassword}   >
            Resend Otp {timeLeft > 0 ? `in ${timeLeft} sec` : ''}
          </button>
        )
      }

    </form>
  )
}

export default ForgetPassword
