import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Catalogue() {
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

  const { id } = useParams(); // Get the id parameter from the URL
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://panel.mait.ac.in:8012";

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get(`http://panel.mait.ac.in:8012/catalogue/get-by-id/${id}/`);
        const catalogData = response.data;
        setCatalog(catalogData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching catalog:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[90%] mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Product Catalogue</h1>
      <div className='border-2 shadow p-5'>
        <div className='mr-[50%]'>
          <Slider {...settings}>
            {catalog.product_image_1 && (
              <div>
                <img src={`${url}${catalog.product_image_1}`} alt={catalog.product_name} className="h-fit m-auto   mb-4 ]" />
              </div>
            )}
            {catalog.product_image_2 && (
              <div>
                <img src={`${url}${catalog.product_image_2}`} alt={catalog.product_name} className="h-fit m-auto  object-cover mb-4" />
              </div>
            )}
            {catalog.product_image_3 && (
              <div>
                <img src={`${url}${catalog.product_image_3}`} alt={catalog.product_name} className="h-fit m-auto  object-cover mb-4" />
              </div>
            )}
            {catalog.product_image_4 && (
              <div>
                <img src={`${url}${catalog.product_image_4}`} alt={catalog.product_name} className="h-fit m-auto  object-cover mb-4" />
              </div>
            )}
            {catalog.product_image_5 && (
              <div>
                <img src={`${url}${catalog.product_image_5}`} alt={catalog.product_name} className="h-fit w-fit m-auto  object-cover mb-4" />
              </div>
            )}
          </Slider>
        </div>

         

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className='flex justify-between w-[600px]'>
            <div>
              <img src={`${url}${catalog.product_image_1}`} alt={catalog.product_name} className="h-fit m-auto w-10 mb-4 ]" />
            </div>
            <div>
              <img src={`${url}${catalog.product_image_2}`} alt={catalog.product_name} className="h-fit m-auto w-10 mb-4 ]" />
            </div>
            <div>
              <img src={`${url}${catalog.product_image_3}`} alt={catalog.product_name} className="h-fit m-auto w-10 mb-4 ]" />
            </div>
            <div>
              <img src={`${url}${catalog.product_image_4}`} alt={catalog.product_name} className="h-fit m-auto w-10 mb-4 ]" />
            </div>
            <div>
              <img src={`${url}${catalog.product_image_5}`} alt={catalog.product_name} className="h-fit m-auto w-10 mb-4 ]" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl mb-2">{catalog.product_name}</h2>
            <div>
              <h2 className="text-xl font-bold mb-2">{catalog.product_name}</h2>
              <p className="text-sm text-gray-600 mb-2">MRP: <span className="font-semibold text-gray-800">{catalog.mrp}</span></p>
              <p className="text-sm text-gray-600 mb-2">Selling Price: <span className="font-semibold text-green-600">{catalog.selling_prize}</span></p>
              <p className="text-sm text-gray-600 mb-2">Buying Price: <span className="font-semibold text-red-600">{catalog.buying_prize}</span></p>
              <p className="text-sm text-gray-600 mb-2">HSN Code: <span className="font-semibold text-gray-800">{catalog.hsn_code}</span></p>
              <p className="text-sm text-gray-600 mb-2">GST Percentage: <span className="font-semibold text-blue-600">{catalog.gst_percentage}</span></p>
              <p className="text-sm text-gray-600 mb-2">Unit: <span className="font-semibold text-gray-800">{catalog.unit}</span></p>
              <p className="text-sm text-gray-600 mb-2">Quantity: <span className="font-semibold text-gray-800">{catalog.quantity}</span></p>
              <p className="text-sm text-gray-600 mb-2">Standardized: <span className={`font-semibold ${catalog.standardized ? 'text-green-600' : 'text-red-600'}`}>{catalog.standardized ? 'Yes' : 'No'}</span></p>
              <p className="text-sm text-gray-600 mb-2">Mapped to Master: <span className={`font-semibold ${catalog.mapped_to_master ? 'text-green-600' : 'text-red-600'}`}>{catalog.mapped_to_master ? 'Yes' : 'No'}</span></p>
              <p className="text-sm text-gray-600 mb-2">Seller: <span className="font-semibold text-gray-800">{catalog.seller}</span></p>
              <p className="text-sm text-gray-600 mb-2">Category: <span className="font-semibold text-gray-800">{catalog.category}</span></p>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
