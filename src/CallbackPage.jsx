import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessToken } from './AccessTokenContext';

const CallbackPage = () => {
  const { setAccessToken } = useAccessToken();
  const navigate = useNavigate();
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: 'https://melo-kappa.vercel.app/callback',
              client_id: clientID,
              client_secret: clientSecret
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to exchange code for token');
          }
          const data = await response.json();
          const accessToken = data.access_token;
          setAccessToken(accessToken); // Set the access token in context
          navigate('/');
        }
      } catch (error) {
        setError(error); // Set the error state if an error occurs
      }
    };

    exchangeCodeForToken();
  }, [setAccessToken, navigate, clientID, clientSecret]);

  // Render error message if there's an error
  if (error) {
    navigate('/');
  }

  return <div>Processing...</div>;
};

export default CallbackPage;
