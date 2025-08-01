import React, { useState } from 'react'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { signup } from '../store/slices/authSlice';




const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const dispatch = useDispatch();

  const { isSigninUp } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  }

  return (
    < >
      <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white'>


        {/*left Side - pattern  */}
                <AuthImagePattern
                title={"Join our community!"}
                subtitle={"Stay connected with friends and family, express yourself freely, and never miss out on the latest updates"}
                />


        {/* right Side */}
        <div className='flex flex-col  justify-center items-center px-6 py-12'>
          <div className='w-full max-w-md '>
            {/* Logo & Heading */}
            <div className=' flex flex-col items-center mb-10 text-center'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <MessageSquare className=' text-blue-600 w-6 h-6' />
              </div>

              <h1 className='text-2xl font-bold mt-4'>Create Account</h1>
              <p className=' text-gray-500 text-sm mt-2'>Get started with your free account</p>



            </div>

            {/* Register form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <User className='w-5 h-5' />
                  </span>
                  <input type="text" className='w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Yogi Adityanath'
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value })
                    }}
                  />
                </div>

              </div>
              
              
              
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    <Mail className='w-5 h-5' />
                  </span>
                  <input type="email" className='w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='yogi@gmail.com'
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
                disabled={isSigninUp}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200 flex justify-center items-center gap-2'>

                {
                  isSigninUp ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' /> Loading...
                    </>
                  ) : (
                    "Create Account"
                  )
                }
              </button>
            </form>


            {/* footer */}

            <div className='my-6 text-center'>
              <p className='text-sm text-gray-500'>
                Already have an account?{" "}
                <Link to={"/login"} className='text-blue-600 font-bold hover:underline'>Sign in</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register
