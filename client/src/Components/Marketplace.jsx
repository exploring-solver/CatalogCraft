import React from 'react';

function Marketplace() {
    return (
        <>
            <h1 className="mt-10 ml-20 text-7xl">Furniture Marketplace</h1>
            <div className="grid grid-cols-3 p-20">
                <Product title="Wooden Chair" price="4000" image="chair.glb" />
                <Product title="Leather Sofa" price="8000" image="sofa.glb" />
                <Product title="Glass Coffee Table" price="6000" image="tableglass.glb" />
                <Product title="Modern Bed Frame" price="10000" image="bed.glb" />
                <Product title="Wardrobe Closet" price="7000" image="wardrobe.glb" />
                <Product title="Dining Chair Set" price="4500" image="dining.glb" />
            </div>

            <h1 className="mt-10 ml-20 text-7xl">Component Marketplace</h1>
            <div className="grid grid-cols-3 p-20">
                <Product title="Chimney" price="10000" image="1.webp" />
                <Product title="LED TV" price="12000" image="2.jpeg" />
                <Product title="Smart Clock" price="5000" image="1.webp" />
                <Product title="Comfortable Chair" price="2500" image="2.jpeg" />
                <Product title="Home Theater System" price="15000" image="1.webp" />
                <Product title="Smart Refrigerator" price="9000" image="2.jpeg" />
            </div>
        </>
    );
}

export default Marketplace;

function Product(props) {
    return (
        <>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
                    <model-viewer
                        src={props.image || 'logo.png'}
                        style={{
                            width: '80%',
                            margin: "20px auto 20px auto",
                            height: '400px',
                            backgroundColor: '#3d35b1',
                            '--poster-color': '#ffffff00',
                        }}
                        ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
                        poster="logo.png"
                        alt="mgcms"
                        shadow-intensity="1"
                        camera-controls
                        auto-rotate
                        ar
                    />
                <div className="px-5 pb-5">
                        <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
                    <div className="grid grid-cols-1 items-center justify-between m-3">
                        <span className="text-xl font-bold text-gray-900 dark:text-white my-2">Price: Rs. <span className="text-2xl">{props.price}</span></span>
                        <a href="#" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 my-2">View in Ar</a>
                    </div>
                </div>
            </div>
        </>
    );
}
