import React from 'react'

function Features() {
    return (
        <div id="features-section" className="text-center pt-20 bg-gray-900">
            <h1 className="text-5xl font-semibold  font-thinspaced tracking-widest mb-20 text-white">Prime Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                <div className="bg-white p-6 rounded-md shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">Better Visualization</h2>
                    <p>Elevate designs with seamless 2D blueprint and 3D metaverse integration, providing users unparalleled visualization and a true-to-life experience of their architectural creations.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md mt-10">
                    <h2 className="text-xl font-semibold mb-4">Component Selection Aid</h2>
                    <p>Simplify design choices with our intuitive component selection aid, offering curated options and AI-driven recommendations to enhance creativity and streamline decision-making.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">Cost Estimation</h2>
                    <p>Empower informed decisions through accurate cost estimations, ensuring transparency and budget adherence at every stage of the architectural design process.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">Real-time Monitoring using SCADA</h2>
                    <p>Ensure project success with real-time monitoring, offering instant insights into progress, performance, and potential issues, enhancing efficiency and facilitating timely decision-making.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md mt-10">
                    <h2 className="text-xl font-semibold mb-4">Customization</h2>
                    <p>Tailor spaces to perfection with robust customization tools, enabling users to personalize colors, sizes, and configurations, fostering a unique and satisfying design experience.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">Connectivity</h2>
                    <p>Foster collaboration effortlessly through seamless connectivity features, facilitating real-time interaction, feedback, and shared decision-making among users, clients, and stakeholders across the architectural design journey.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Features