import React, {useState} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {UserAuth} from '../context/AuthContext'
import {db} from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Movie = ({item}) => {

    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const {user} = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)


    const saveMovie = async () => {
      if(user?.email) {
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          savedMovies: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path
          })
        })
      } else {
        alert('Please log in to save the movie')
      }
    }

    function colorRating(num) {

      if( num >= 8 ) {
        return "text-green-500"
      } else if ( num >= 5 ) {
        return "text-orange-400"
      } else {
        return "text-red-500"
      }
    }

  return (
    <div className='w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] inline-block cursor-pointer relative p-2'>
        <img className='w-full' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
        <div className='absolute top-0 left-0 w-full h-full bg-black/80 select-none opacity-0 hover:opacity-100'>
            <div className='w-full h-full text-white text-xs whitespace-normal flex flex-col items-center justify-center gap-2 text-center md:text-sm'>
              <h2 >{item?.title}</h2>
              <p className={colorRating(item?.vote_average)}>{item?.vote_average}</p>
            </div>
            <p onClick={saveMovie}>
                {like ? <FaHeart className='absolute top-4 left-4 text-white cursor-pointer' /> : <FaRegHeart className='absolute top-4 left-4 text-white cursor-pointer' />}
            </p>
        </div>
    </div>
  )
}

export default Movie