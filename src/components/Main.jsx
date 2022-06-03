import React, {useState, useEffect} from 'react'
import axios from 'axios'
import requests from '../Requests'


const Main = () => {
    const [movies, setMovies] = useState([])
    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(()=> {
        axios.get(requests.popularMovies).then((res) => {
            setMovies(res.data.results)
        })

    }, [])

    const truncateStr = (str, num) => {
       if (str?.length > num) {
           return str.slice(0, num) + '...'
       } else {
           return str
       }
    }

  return (
    <div className='w-full h-[750px] text-white md:h-[550px]'>
        <div className='w-full h-full relative'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black z-10'></div>
            <div className='absolute top-[60%] z-[100] px-6 md:top-[40%]'>
                <h1 className='text-white text-4xl font-bold mb-4 md:text-6xl w-full lg:w-[70%]'>{movie?.title}</h1>
                <div className='space-x-4 mb-6'>
                    <button className='text-red-500 bg-white/90 text-md pt-1 pb-2 px-8 rounded-md md:text-xl md:pb-3 md:pt-2 hover:bg-red-500/90 hover:text-white/90'>Play</button>
                    <button className='text-md md:text-xl hover:text-red-500/90'>Watch Later</button>
                </div>
                <p className='text-gray-300 text-sm mb-1'>{movie?.release_date}</p>
                <p className='text-white text-md w-full md:w-[70%] lg:w-[50%] xl:w-[35%]'>{truncateStr(movie?.overview, 150)}</p>
            </div>
        </div>
    </div>
  )
}

export default Main