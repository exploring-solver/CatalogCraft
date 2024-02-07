import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Marketplace from "./Components/Marketplace";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Features from "./Components/Features";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Features />
          </>
          } />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App


const showAccordion = () => {
  if (window.location.pathname === "/") {
    return <Accordion />
  }
}

