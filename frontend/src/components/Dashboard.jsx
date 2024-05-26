import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography, Button, Spinner } from '@material-tailwind/react';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [catalogues, setCatalogues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user details from your API
        axios.get('http://panel.mait.ac.in:8012/auth/user-details/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Add the token to the 'Authorization' header
                'Content-Type': 'application/json', // Adjust headers as needed
            }
        })
            .then((response) => {
                // Assuming the API response contains user data
                setUser(response.data);
                // Fetch the catalogues of the logged-in user
                return axios.get('http://panel.mait.ac.in:8012/catalogue/get/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                });
            })
            .then((response) => {
                setCatalogues(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-yellow-50">
            {loading ? (
                <div className='flex justify-center items-center'> 
                <Spinner className=" h-16 w-16 text-gray-900/50" />
                </div>
            ) : (
                <>
                    <Card className="mb-4">
                        <CardHeader className="bg-gray-800 text-white p-5">
                            <Typography variant="h4" color="white">
                                Welcome
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6">Email:<span className='!font-normal text-black'> {user.email}</span></Typography>
                            <Typography variant="h6">Name: <span className='!font-normal text-black'>{user.name}</span></Typography>
                            {/* <Typography variant="h6">Number<span className='!font-normal text-black'>: {user.number}</Typography> */}
                            <Typography variant="h6">Role: <span className='!font-normal text-black'>{user.role}</span></Typography>
                        </CardBody>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardBody>
                                <Typography variant="h6" className="mb-2">Your Total Catalogues</Typography>
                                <Typography variant="h4">{catalogues.length}</Typography>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Typography variant="h6" className="mb-2">Complete Catalogues</Typography>
                                <Typography variant="h4">{catalogues.filter(catalogue => catalogue.complete).length}</Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <br />
                    <div>
                        <Card>
                            <CardBody className="flex flex-col items-start justify-center">
                                <Typography variant="h6" className="mb-2">Wanna add a new Product?</Typography>
                                <Link to={'/product-search'} className='w-fit'>
                                    <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Create Catalog
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                    <br />
                    <div>
                        <br />
                        <Card>
                            <CardHeader className="flex justify-between items-center p-4">
                                <Typography variant="h6" className='!text-orange-900'>
                                    Your Catalogues
                                </Typography>
                                <Link to={'/my-cata'}>
                                    <Button variant="text" color="blue">
                                        View All
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                {catalogues.slice(0, 5).map((catalogue) => (
                                    <div key={catalogue.id} className="mb-4 border-[1px] rounded border-black shadow p-5">
                                        <img 
                                            src={`http://panel.mait.ac.in:8012${catalogue.product_image_1}`} 
                                            alt={`${catalogue.name} image`} 
                                            className="w-32 object-cover mb-2 rounded"
                                        />
                                        <Typography variant="h6" className="font-bold">{catalogue.product_name}</Typography>
                                        <Typography variant="body2" className="text-gray-600">{catalogue.description}</Typography>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
