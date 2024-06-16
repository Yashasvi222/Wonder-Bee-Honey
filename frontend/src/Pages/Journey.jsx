import React from 'react'
import './Journey.css'
import Carousel from '../Components/Carousel/Carousel'

const Journey = () => {
  return (
    <div>
      <Carousel/>
      <div className="about-us">
        <p className="about-us-subheading">About <span className='specific-color'>Us</span></p>
        <p className="about-us-subheading-content">Wonder Bee Honey is providing Organic Honey Straight from Bee hives.
          We do bee keeping and are selling it online to our customers to help them reach their fitness goals. Wonder 
          Bee Honey Products has been continuously helping people to keep healthy life since March 2020. Currently 
          there are over 1500 families all over India who consume Raw Organic Honey from Wonder Bee Honey Products. </p>
        <p className="about-us-subheading"><span className="specific-color">Our</span> Mission</p>
        <p className="about-us-subheading-content">Wonder Bee Honey is committed to delivering premium-quality, pure, 
          and natural organic honey to consumers. Our priority is maintaining the integrity of honey as a true elixir. 
          Our raw, unprocessed honey is safe for direct consumption, ensuring that every drop retains its natural goodness. 
          Trust Wonder Bee Honey for a delicious and wholesome addition to your daily routine.</p>
      </div>
      

    </div>
  )
}

export default Journey
