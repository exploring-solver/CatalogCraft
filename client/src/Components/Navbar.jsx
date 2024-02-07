import React from 'react'

function Navbar() {
    return (
        <nav className="bg-[url('/gradient-bg.jpg')] p-1 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="logo text-white text-2xl font-bold">CatalogCraft</div>
                {/* <div class="text-4xl font-extrabold">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-600">
                        Logo
                    </span>
                </div> */}

                <div className="flex space-x-4">
                    <a href="/" className="text-white font-semibold m-2 p-3 text-lg duration-200 hover:opacity-80">Home</a>
                    <a href="#features-section" className="text-white font-semibold m-2 p-3 text-lg duration-200 hover:opacity-80">Features</a>
                    <a href="/marketplace" className="text-white font-semibold m-2 p-3 text-lg duration-200 hover:opacity-80">Marketplace</a>
                    <a href="#" className="text-white border-solid rounded-full border-2 border-black font-semibold m-2 p-3 text-lg duration-200 hover:bg-black">Download</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar