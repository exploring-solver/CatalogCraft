import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Slider from 'react-slick';
import digi1 from '../assets/bg1_digi.jpg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CatalogList from './CatalogList';
import FaqSection from './FaqSection';
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

  const slides = [
    {
      src: "../src/assets/step1.jpg",
      title: "Easy E-Commerce Store Catalog Creation",
      description: "We offer an easy-to-use app for sellers to create their e-commerce store catalogues, helping them reach a wider audience and increase sales.",
      id: 1,
    },
    {
      src: "../src/assets/step2.jpg",
      title: "Effortless Catalog Digitization",
      description: "Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.",
      id: 2,
    },
    {
      src: "../src/assets/step3.jpg",
      title: "Effortless Catalog Digitization",
      description: "Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.",
      id: 3,
    },
    {
      src: "../src/assets/step4.jpg",
      title: "Effortless Catalog Digitization",
      description: "Our platform streamlines the process of catalog digitization, making it hassle-free for sellers to manage their product listings and showcase them effectively.",
      id: 4,
    },
    {
      src: "../src/assets/workflow.jpg",
      title: "Sell Standardized and Non-Standardized Products",
      description: "Our platform allows sellers to create catalogs for both standardized and non-standardized products, providing flexibility and customization.",
      id: 5,
    },
  ];

  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(idx);

  const trend = idx > prevIdx ? 1 : -1;

  const imageIndex = Math.abs(idx % slides.length);

  //TODO: Make it professional and change images in caraousel to new idea and execution
  //TODO: Hero Section
  return (
    <div className="container mx-auto mt-5 w-[90%]">
      <h1 className="text-3xl font-bold mb-5 text-center">Welcome to CatalogCraft</h1>
      <Slider {...settings}>
        <div className="bg-gray-200 p-2">
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

        <div className="bg-gray-200 p-2">
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
        <div className="bg-gray-200 p-2">
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
        <div className="bg-gray-200 p-2">

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
        <div className="bg-gray-200 p-2">
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
      <br /><br />

      <div className="flex justify-center items-center mt-8 flex-wrap gap-10">
        {/* Image */}
        <div className="">
          <img src={digi1} alt="Digitize Store Catalogs" className=" object-cover md:w-[600px] w-[200px] " />
        </div>

        {/* Text */}
        <div className='lg:w-[40%]'>
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
      <FaqSection />
    </div>
  );
}

export default Home;

const imgVariants = {
  initial: (trend) => ({
    x: trend === 1 ? "200%" : "-200%",
    opacity: 0,
  }),
  animate: { x: "-50%", opacity: 1 },
  exit: (trend) => ({
    x: trend === 1 ? "-200%" : "200%",
    opacity: 0,
  }),
};

const titleVariants = {
  initial: (trend) => ({
    y: trend === 1 ? 20 : -20,
    opacity: 0,
  }),
  animate: { y: 0, opacity: 1 },
  exit: (trend) => ({
    y: trend === 1 ? -20 : 20,
    opacity: 0,
  }),
};
