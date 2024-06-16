import React, { useState, useEffect } from 'react';
import './Carousel.css'; 
import image1 from '../Assets/Slider_Img01.jpg';
import image2 from '../Assets/Slider_Img02.jpg';
import image3 from '../Assets/Slider_Img03.jpg';

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3]; 
  const texts = ["Pollinator Wellfare", "Bee-Friendly Farming", "Environmental Stewardship"];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <React.Fragment key={index}>
            <img
              className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
              src={image}
              alt={`Slide ${index + 1}`}
            />
            <div className={`slider-text ${index === currentImageIndex ? 'active' : ''}`}>
              {texts[index]}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
