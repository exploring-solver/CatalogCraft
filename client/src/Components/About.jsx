import React from 'react'

function About() {
    return (
        <section id='about-section' className="bg-gray-300">
            <div className="gap-16 items-center  px-4 mx-auto max-w-screen-xl grid grid-cols-2">
                <div className="font-light text-black ">
                    <h2 className="text-5xl font-semibold font-thinspaced tracking-widest text-gray-900 mb-20">What We Do!</h2>
                    <p className="mb-6 text-2xl text-left">Innovation meets architecture. Our B2C platform transforms ideas into reality with unparalleled visualization, aiding users in component selection, cost estimation, and real-time monitoring. Customize effortlessly and connect seamlessly for a transformative design experience.
                    </p>
                    <p className="mb-6 text-2xl text-left">In the B2B segment redefining architectural solutions. Experience advanced visualization, SCADA-powered real-time monitoring, and collaborative design spaces. Our platform ensures connectivity, enabling efficient project management and informed decision-making. Welcome to the future of architecture.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-20">
                    <img className="w-full rounded-lg h-96" src="/1.webp" alt="1" />
                    <img className="w-full mt-10 rounded-lg h-96" src="/2.jpeg" alt="2" />
                </div>
            </div>
        </section>
    )
}

export default About