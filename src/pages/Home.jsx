import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <>
        <Main />
        <Row rowID={1} title={"UpComing"} fetchURL={requests.upComingMovies} />
        <Row rowID={2} title={"Top Rated Movies"} fetchURL={requests.topRatedMovies} />
        <Row rowID={3} title={"Trending Movies"} fetchURL={requests.trendingMovies} />
        <Row rowID={4} title={"Horror Movies"} fetchURL={requests.horrorMovies} /> 
    </>
  )
}

export default Home