import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import Movie from './Movie'

const Row = ({title, fetchURL, rowID}) => {

    const [movies, setMovies] = useState([])

    console.log(movies)

    useEffect(() => {
        axios.get(fetchURL).then(response => setMovies(response.data.results))
    }, [fetchURL])

    function slideLeft(){
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500 
    }

    function slideRight(){
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500 
    }

  return (
    <div className='px-6'>
        <h1 className='text-white p-2'>{title}</h1>
        <div className='relative flex items-center group'>
            <MdChevronLeft onClick={slideLeft} className='text-white absolute -left-4 bg-white/40 rounded-full cursor-pointer z-[20] hidden hover:text-red-500 group-hover:block' size={50} />
            <div id={"slider" + rowID} className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth h-full w-full">
                {movies.map((item, id) => (
                    <Movie key={id} item={item} />
                ))}
            </div>
            <MdChevronRight onClick={slideRight} className='text-white absolute -right-4 bg-white/40 rounded-full cursor-pointer z-[20] hidden hover:text-red-500 group-hover:block' size={50} />
        </div>
    </div>
  )
}

export default Row