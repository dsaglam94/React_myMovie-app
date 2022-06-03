import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const {user, signUp} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        await signUp(email, password)
        navigate('/')
        } catch (error) {
        console.log(error)
        }
    }


  return (
      <>
        <div className='w-full h-screen '>
            <img className='absolute object-cover w-full h-full' src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/b8fd0ac0-fd6b-49d6-9d9c-4e7e2bd47a1a/TR-en-20220516-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="The posters of various movies and TV Shows" />
            <div className='fixed bg-black/60 top-0 left-0 w-full min-h-screen '></div>
            <div className='fixed w-full px-4 py-56 md:py-36 z-50'>
                <div className='max-w-[400px] h-[500px] mx-auto bg-black/75 text-white'>
                    <div className='w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' autoComplete='email'/>
                            <input onChange={(e) => setPassword(e.target.value)}  className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='password'/>
                            <button className='bg-red-500 py-3 my-6 rounded font-bold'>
                                Sign Up
                            </button>
                            <div className='flex items-center justify-between text-sm text-gray-500'>
                                <label><input className='mr-2' type="checkbox" />Remember me</label>
                                <p>Need help?</p>
                            </div>
                            <p className='py-4 text-sm'>
                                <span className='text-gray-500'>Already subscribed to myMovie? 
                                </span>{' '}
                                <Link to="/login">
                                Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default Signup