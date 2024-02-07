import React from 'react';

const Bhk3 = () => {

    const selectedAddons = location.state?.selectedAddons || [];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Flat Type: "3 BHK"</h2>
        <p className="text-gray-600">Selected Components: {selectedAddons.join(', ')}</p>

      <ul className="list-disc mt-4 ml-6">
    
      </ul>

      <div className="mt-8 z-10">
        <h3 className="text-xl font-bold mb-4"></h3>
        <model-viewer
          src='/1bhk.glb'
          style={{
            width: '800px',
            margin: "auto",
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
      </div>

      <div className="my-8">
        <a
          href="https://www.spatial.io/s/SoberSphere-655c8e28c41d46b41c94c3e3?share=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-4 py-2 text-2xl font-semibold rounded-md hover:bg-purple-700 transition duration-300 flex justify-center"
        >
          Visit in Metaverse
        </a>
      </div>
    </div>
  );
};

export default Bhk3;
