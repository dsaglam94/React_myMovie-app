import React from 'react'
import SavedMovies from '../components/SavedMovies'

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
      <img className='object-cover w-full h-[450px]' src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/b8fd0ac0-fd6b-49d6-9d9c-4e7e2bd47a1a/TR-en-20220516-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="The posters of various movies and TV Shows" />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-[450px]'></div>
      <div className='absolute top-[40%] md:top-[25%] p-6'>
        <h1 className='text-white font-bold text-3xl md:text-5xl'>My Shows</h1>
      </div>
      </div>
      <SavedMovies />
    </>
  )
}

export default Account