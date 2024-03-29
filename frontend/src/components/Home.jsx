import React from 'react';
import Slider from 'react-slick';
import digi1 from '../assets/bg1_digi.jpg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CatalogList from './CatalogList';
import step1 from '../assets/step1.jpg'
import step2 from '../assets/step2.jpg'
import step3 from '../assets/step3.jpg'
import step4 from '../assets/step4.jpg'
import workflow from '../assets/workflow.jpg'
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
    <div className="container mx-auto mt-5 w-[90%]">
      <h1 className="text-3xl font-bold mb-5">Welcome to CatalogCraft</h1>
      <Slider {...settings}>


        <div>
          <img
            className="d-block w-[600px] m-auto"
            src={step1}
            alt="Second slide"
          />
          <div className='w-[600px] m-auto'>
            <h3 className="text-2xl font-bold mb-4">Easy E-Commerce Store Catalog Creation</h3>
            <p className="text-lg text-gray-700 mb-4">
              We offer an easy-to-use app for sellers to create their e-commerce store catalogues, helping them reach a wider audience and increase sales.
            </p>
          </div>
        </div>

        <div>
          <img
            className="d-block w-[600px] m-auto"
            src={step2}
            alt="Third slide"
          />
          <div className='w-[600px] m-auto'>
            <h3 className="text-2xl font-bold mb-4">Effortless Catalog Digitization</h3>
            <p className="text-lg text-gray-700 mb-4">
              Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.
            </p>
          </div>
        </div>
        <div>
          <img
            className="d-block w-[600px] m-auto"
            src={step3}
            alt="Third slide"
          />
          <div className='w-[600px] m-auto'>
            <h3 className="text-2xl font-bold mb-4">Effortless Catalog Digitization</h3>
            <p className="text-lg text-gray-700 mb-4">
              Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.
            </p>
          </div>
        </div>
        <div>
          <img
            className="d-block w-[600px] m-auto"
            src={step4}
            alt="Third slide"
          />
          <div className='w-[600px] m-auto'>
            <h3 className="text-2xl font-bold mb-4">Effortless Catalog Digitization</h3>
            <p className="text-lg text-gray-700 mb-4">
              Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.
            </p>
          </div>
        </div>
        <div>
          <img
            className="d-block w-[600px] m-auto"
            src={workflow}
            alt="First slide"
          />
          <div className='w-[600px] m-auto'>
            <h3 className="text-2xl font-bold mb-4">Sell Standardized and Non-Standardized Products</h3>
            <p className="text-lg text-gray-700 mb-4">
              Our platform allows sellers to create catalogs for both standardized and non-standardized products, providing flexibility and customization.
            </p>
          </div>
        </div>
      </Slider>


      <div className="flex justify-between items-center mt-8">
        {/* Image */}
        <div className="">
          <img src={digi1} alt="Digitize Store Catalogs" className=" object-cover md:w-[600px] w-[200px] " />
        </div>

        {/* Text */}
        <div className='w-[40%]'>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Digitize Store Catalogs with One Click</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our innovative solution allows you to easily <span className="font-bold text-blue-600">digitize your store catalogs with just one click</span>.
            Say goodbye to manual data entry and tedious processes. With our platform, you can streamline
            the digitization process and save valuable time and resources.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you prefer <span className="font-bold text-green-600">text, image, or voice input</span>, our platform supports various input methods
            to suit your preferences and convenience. Simply upload your catalogs, and our advanced
            algorithms will handle the rest, converting your catalogs into digital format accurately
            and efficiently.
          </p>
          <p className="text-lg text-gray-700">
            Experience the future of catalog management with our <span className="font-bold text-purple-600">intuitive solution</span>. Empower your
            business with digital transformation and stay ahead of the competition.
          </p>
        </div>

      </div>
      <CatalogList />
    </div>
  );
}

export default Home;
