import React from 'react'
import HeroSlider from '../HeroSection/HeroSlider'
import StatisticsSection from '../../pages/StatisticsSection/StatisticsSection'
import TopRatedMovies from '../../pages/TopRatedMovies'
import RecentlyAdded from '../../pages/RecentlyAdded'
import GenreSection from '../../pages/GenreSection'
import AboutPage from '../../pages/AboutPage'

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <StatisticsSection />
      <TopRatedMovies/>
      <RecentlyAdded/>
      <GenreSection/>
      <AboutPage/>
    </div>
  )
}

export default Home