import React, { useState } from 'react'
import {FaPizzaSlice, FaSearch} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {

  const [isSearchScreenOpen, setIsSearchScreenOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [movies, setMovies] = useState([])
  const url = `https://imdb-api.com/en/API/SearchMovie/k_9bavb3k2/${inputText}`

  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchScreen = () => {
    setIsSearchScreenOpen(prevVal => !prevVal)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!inputText) {
      return
    } else {
      fetch(url)
        .then(res => res.json())
        .then(data => setMovies(data.results))
    }
  }

  if (!isSearchScreenOpen) {
    document.querySelector('body').style.overflowY = 'scroll'
  } else if (isSearchScreenOpen) {
    document.querySelector('body').style.overflowY = 'hidden'
  }

console.log(movies)


  return (
    <div className='fixed z-[1000] top-0 w-full flex flex-col items-center justify-between p-6 gap-6 md:flex-row md:space-y-0'>
      <Link to='/'>
        <div className='flex items-center'>
            <h1 className='text-white text-2xl pr-2 lg:text-3xl'>myMovie</h1>
            <FaPizzaSlice className='text-red-500' size={30} />
        </div>
        </Link>
        {user?.email ? <div className='flex items-center gap-5'>
          <Link to="/account">
            <button className='text-white text-md hover:text-red-500'>Account</button>
          </Link>

            <button onClick={handleLogout} className='text-white bg-red-500 text-md px-8 pt-2 pb-3 rounded-md hover:bg-white hover:text-red-500'>Log Out</button>
            <FaSearch onClick={handleSearchScreen} size={25} className="text-gray-50 cursor-pointer hover:text-red-500"/>
        </div> : 
        <div className='flex items-center gap-5'>
        <Link to="/login">
          <button className='text-white text-md hover:text-red-500'>Sign In</button>
        </Link>
        <Link to="/signup">
          <button className='text-white bg-red-500 text-md px-8 pt-2 pb-3 rounded-md hover:bg-white hover:text-red-500'>Sign Up</button>
        </Link>
      </div>}

      <div className={isSearchScreenOpen ? 'w-full h-screen bg-black/70 absolute top-0 left-0 flex items-center justify-center' : 'hidden'}>
        <div className='w-[90%] h-[90vh] bg-gray-800 p-10 rounded-md overflow-y-scroll'>
          <div className='w-full flex items-start justify-between gap-10 md:items-center'>
            <div className='w-full flex flex-col space-y-4 md:space-x-4 md:flex-row md:space-y-0'>
              <input onChange={(e) => setInputText(e.target.value)} className='w-full md:w-1/3 px-2 py-2 rounded-md bg-gray-300 border-none outline-none' type="text" placeholder='Search here' />
              <button onClick={handleSubmit} className='bg-red-600 text-white rounded-md px-6 py-2 hover:bg-white hover:text-red-600'>Search</button>
            </div>
            <AiOutlineClose onClick={handleSearchScreen} className='text-white cursor-pointer hover:text-red-600 hover:rotate-90 transition-transform delay-100' size={25}/>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10'>
              {movies.map(movie => (
                <div className='w-full relative group cursor-pointer'>
                  <img className='w-full h-full block object-cover' src={movie?.image} alt={movie?.title} />
                  <div className='absolute w-full h-full top-0 left-0 px-4 text-center bg-black/80 text-white hidden items-center justify-center group-hover:flex'>
                    <p className='text-xs'>{movie?.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar