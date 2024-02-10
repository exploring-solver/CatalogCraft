import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CatalogList from './CatalogList';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    adaptiveHeight: true
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-5">Welcome to CatalogCraft</h1>
      <Slider {...settings}>
        <div>
          <img
            className="d-block w-100 m-auto"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <div>
            <h3>Sell Standardized and Non-Standardized Products</h3>
            <p>Our platform allows sellers to create catalogs for both standardized and non-standardized products, providing flexibility and customization.</p>
          </div>
        </div>
        <div>
          <img
            className="d-block w-100 m-auto"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <div>
            <h3>Easy E-Commerce Store Catalog Creation</h3>
            <p>We offer an easy-to-use app for sellers to create their e-commerce store catalogues, helping them reach a wider audience and increase sales.</p>
          </div>
        </div>
        <div>
          <img
            className="d-block w-100 m-auto"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <div>
            <h3>Effortless Catalog Digitization</h3>
            <p>Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.</p>
          </div>
        </div>
      </Slider>
      <CatalogList/>
    </div>
  );
}

export default Home;
