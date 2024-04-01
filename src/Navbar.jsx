import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 fixed top-0 w-full z-50 backdrop-blur-md shadow-lg">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center">
      <img src="logo.png" alt="Brand Logo" className="h-8 w-8 mr-2 ms-6" />
      <span className="text-white text-lg font-bold">Melo</span>
    </div>

    <div className="hidden md:flex items-center me-6">
      <a href="#" className="text-white hover:text-gray-300 me-6">Home</a>
      <a href="#" className="text-white hover:text-gray-300 me-6">About</a>
      <a href="#" className="text-white hover:text-gray-300 me-6">Services</a>
      <a href="#footer" className="text-white hover:text-gray-300 me-6">Contact</a>
    </div>

    <div className="md:hidden">
      <button className="text-white focus:outline-none">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </div>
</nav>


  )
}

export default Navbar