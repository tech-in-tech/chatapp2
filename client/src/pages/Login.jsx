import React, { useState } from 'react'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { login } from '../store/slices/authSlice';
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { isLogingIn } = useSelector(state => state.auth)
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData)) 
  }
  return (
    <>
      <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white'>
        {/* Left Side */}
        <div className='flex flex-col  justify-center items-center px-6 py-12'>
          <div className='w-full max-w-md '>
            {/* Logo & Heading */}
            <div className=' flex flex-col items-center mb-10 text-center'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <MessageSquare className=' text-blue-600 w-6 h-6' />
              </div>

              <h1 className='text-2xl font-bold mt-4'>Welcome Back</h1>
              <p className=' text-gray-500 text-sm mt-2'>Sign in to your account</p>
            </div>
            {/* Login form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <Mail className='w-5 h-5' />
                  </span>
                  <input type="email" className='w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='you@gmail.com'
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                    }}
                  />
                </div>

              </div>



              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <Lock className='w-5 h-5' />
                  </span>
                  <input type={showPassword ? "text" : "password"} className='w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='********'
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                    }}
                  />

                  <button type='button' className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' onClick={() => { setShowPassword(!showPassword) }} >

                    {
                      showPassword ? (
                        <EyeOff className='w-5 h-5' />
                      ) : (
                        <Eye className=' w-5 h-5' />
                      )
                    }

                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button type='submit'
                disabled={isLogingIn}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200 flex justify-center items-center gap-2'>

                {
                  isLogingIn ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' /> Loading...
                    </>
                  ) : (
                    "Sign In"
                  )
                }
              </button>



            </form>


            {/* footer */}

            <div className='my-6 text-center'>
              <p className='text-sm text-gray-500'>
                Don't have an account?{" "}
                <Link to={"/register"} className='text-blue-600 font-bold hover:underline'>Create account</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}


        <AuthImagePattern title={"Welcome back!"} subtitle = {"Sign in to continue your conversation and catch up your messages"} />
      </div>

    </>
  )
}

export default Login
