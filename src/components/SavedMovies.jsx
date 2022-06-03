import React, {useState, useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'

const SavedMovies = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    function slideLeft(){
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500 
    }

    function slideRight(){
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500 
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedMovies);
        });
      }, [user?.email]);

      const movieRef = doc(db, 'users', `${user?.email}`)

      const deleteShow = async (passedID) => {
        try {
          const result = movies.filter((item) => item.id !== passedID)
          await updateDoc(movieRef, {
              savedMovies: result
          })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='px-6'>
        <h1 className='text-white p-2'>My Movies</h1>
        <div className='relative flex items-center group'>
            <MdChevronLeft onClick={slideLeft} className='text-white absolute -left-4 bg-white/40 rounded-full cursor-pointer z-[20] hidden hover:text-red-500 group-hover:block' size={50} />
            <div id={"slider"} className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth h-full w-full">
                {movies.map((item, id) => (
                <div key={id} className='w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] inline-block cursor-pointer relative p-2'>
                    <img className='w-full' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                    <div className='absolute top-0 left-0 w-full h-full bg-black/80 select-none opacity-0 hover:opacity-100'>
                        <div className='w-full h-full text-white text-xs whitespace-normal flex flex-col items-center justify-center gap-2 text-center md:text-sm'>
                          <h2 >{item?.title}</h2>
                        </div>
                        <p onClick={() => deleteShow(item.id)} className='absolute text-gray-50 top-4 right-4 z-10'><AiOutlineClose /></p>
                    </div>
                </div>
                ))}
            </div>
            <MdChevronRight onClick={slideRight} className='text-white absolute -right-4 bg-white/40 rounded-full cursor-pointer z-[20] hidden hover:text-red-500 group-hover:block' size={50} />
        </div>
    </div>
  )
}

export default SavedMovies