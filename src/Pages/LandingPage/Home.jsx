import React from 'react'
import Navbar from '../../Components/LandingPage/Navbar'
import HeroSection from '../../Components/LandingPage/HeroSection'
import MiniHero from '../../Components/LandingPage/MiniHero'
import Features from '../../Components/LandingPage/Features'
import FeatureDesc from '../../Components/LandingPage/FeatureDesc'
import FAQ from '../../Components/LandingPage/FAQ'
import SubscribeSection from '../../Components/LandingPage/SubscribeSection'
import Footer from '../../Components/LandingPage/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <MiniHero />
    <Features />
    <FeatureDesc/>
    <FAQ />
    <SubscribeSection />
    <Footer />
    </>
  )
}

export default Home