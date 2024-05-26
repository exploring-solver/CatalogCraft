import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { Card, CardBody, CardHeader, CardFooter, Typography, Button } from '@material-tailwind/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function UserCatalogCard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true,
  };

  const { id } = useParams(); // Get the id parameter from the URL
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://panel.mait.ac.in:8012";


  //TODO: Doesn't work for get by id in your catalogues
  // TODO: add some data in get by id to show on catalog details
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get(`
        http://panel.mait.ac.in:8012/catalogue/get-sellercatalogue-by-id/${id}/`);
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
    <div className="w-[90%] mx-auto mt-8 ">
      <br />
      <Typography variant="h3" color="blue-gray" className="mb-8 text-center underline">
        Product Catalogue
      </Typography>
      <br />
      <Card className="shadow-lg bg-gray-100">
        <div className='flex gap-5 flex-wrap items-center'>

          <CardHeader color="blue-gray" className="relative h-56 w-[50%]">
            <Slider {...settings}>
              {catalog.product_image_1 && (
                <div>
                  <img src={`${url}${catalog.product_image_1}`} alt={catalog.product_name} className="max-h-60 md:max-w-full h-auto m-auto mb-4" />
                </div>
              )}
              {catalog.product_image_2 && (
                <div>
                  <img src={`${url}${catalog.product_image_2}`} alt={catalog.product_name} className="max-h-60 md:max-w-full h-auto m-auto mb-4" />
                </div>
              )}
              {catalog.product_image_3 && (
                <div>
                  <img src={`${url}${catalog.product_image_3}`} alt={catalog.product_name} className="max-h-60 md:max-w-full h-auto m-auto mb-4" />
                </div>
              )}
              {catalog.product_image_4 && (
                <div>
                  <img src={`${url}${catalog.product_image_4}`} alt={catalog.product_name} className="max-h-60 md:max-w-full h-auto m-auto mb-4" />
                </div>
              )}
              {catalog.product_image_5 && (
                <div>
                  <img src={`${url}${catalog.product_image_5}`} alt={catalog.product_name} className="max-h-60 md:max-w-full h-fit w-fit m-auto mb-4" />
                </div>
              )}
            </Slider>
          </CardHeader>
          <div className='flex gap-1 flex-wrap flex-col'>
            {catalog.product_image_1 &&
              <div className='border-[1px] border-gray-700 p-[1px] rounded'>
              <img src={`${url}${catalog.product_image_1}`} alt={catalog.product_name} className="h-fit m-auto w-16 mb-4 ]" />
            </div>}
            {catalog.product_image_2 &&
              <div className='border-[1px] border-gray-700 p-[1px] rounded'>
              <img src={`${url}${catalog.product_image_2}`} alt={catalog.product_name} className="h-fit m-auto w-16 mb-4 ]" />
            </div>}
            {catalog.product_image_3 &&
            <div className='border-[1px] border-gray-700 p-[1px] rounded'>
              <img src={`${url}${catalog.product_image_3}`} alt={catalog.product_name} className="h-fit m-auto w-16 mb-4 ]" />
            </div>}
            {catalog.product_image_4 &&
              <div className='border-[1px] border-gray-700 p-[1px] rounded'>
              <img src={`${url}${catalog.product_image_4}`} alt={catalog.product_name} className="h-fit m-auto w-16 mb-4 ]" />
            </div>}
            {catalog.product_image_5 && 
            <div className='border-[1px] border-gray-700 p-[1px] rounded'>
              <img src={`${url}${catalog.product_image_5}`} alt={catalog.product_name} className="h-fit m-auto w-16 mb-4 ]" />
            </div>}
          </div>
        </div>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-4 !font-semibold">
            {catalog.product_name}
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <Typography variant="body1" color="gray">
              MRP: <span className="font-semibold">{catalog.mrp}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              Selling Price: <span className="font-semibold text-green-600">{catalog.selling_prize}</span>
            </Typography>
            {/* <Typography variant="body1" color="gray">
              Buying Price: <span className="font-semibold text-red-600">{catalog.buying_prize}</span>
            </Typography> */}
            <Typography variant="body1" color="gray">
              HSN Code: <span className="font-semibold">{catalog.hsn_code}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              GST Percentage: <span className="font-semibold text-blue-600">{catalog.gst_percentage}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              Unit: <span className="font-semibold">{catalog.unit}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              EAN: <span className="font-semibold">{catalog.ean}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              Quantity: <span className="font-semibold">{catalog.quantity}</span>
            </Typography>
            <Typography variant="body1" color="gray">
              Standardized: <span className={`font-semibold ${catalog.standardized ? 'text-green-600' : 'text-red-600'}`}>{catalog.standardized ? 'Yes' : 'No'}</span>
            </Typography>
            {/* <Typography variant="body1" color="gray">
              Mapped to Master: <span className={`font-semibold ${catalog.mapped_to_master ? 'text-green-600' : 'text-red-600'}`}>{catalog.mapped_to_master ? 'Yes' : 'No'}</span>
            </Typography> */}
            {/* <Typography variant="body1" color="gray">
              Seller: <span className="font-semibold">{catalog.seller}</span>
            </Typography> */}
            <Typography variant="body1" color="gray">
              Category: <span className="font-semibold">{catalog.category}</span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button variant="gradient" color="blue" onClick={() => alert('Catalogue action triggered!')}>
            Manage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserCatalogCard;
