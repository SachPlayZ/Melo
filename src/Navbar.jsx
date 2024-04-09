import React, { useState, useEffect } from 'react';
import { useAccessToken } from './AccessTokenContext';

const Navbar = () => {
  const { accessToken } = useAccessToken(); // Access accessToken from the context

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    // Fetch user details using the access token
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [accessToken]);

  const handleLoginClick = () => {
    // Construct the URL for Spotify authorization
    const redirectUri = encodeURIComponent('http://localhost:5173/callback');
    window.location.href = `https://accounts.spotify.com/authorize?client_id=46aac0a62444457fb2e169c39e4e0b78&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email%20user-library-read%20user-read-recently-played%20user-top-read%20user-read-currently-playing`;
  };

  return (
    <nav className="bg-transparent py-4 fixed top-0 w-full z-50 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="logo.png" alt="Brand Logo" className="h-8 w-8 mr-2 ms-6" />
          <span className="text-white text-lg font-bold">Melo</span>
        </div>

        <div className="hidden md:flex items-center me-6">
          <a href="#home" className="text-white hover:text-gray-300 me-6">Home</a>
          <a href="#about" className="text-white hover:text-gray-300 me-6">About</a>
          <a href="#footer" className="text-white hover:text-gray-300 me-6">Contact</a>
          {userDetails ? (
            <div className="flex items-center">
              <img src={userDetails.images[0].url} alt="User" className="h-8 w-8 rounded-full mr-2" />
              <span className="text-white">{userDetails.display_name}</span>
            </div>
          ) : (
            <button onClick={handleLoginClick} className="text-white hover:text-gray-300 me-6">Login with Spotify</button>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
