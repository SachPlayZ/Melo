import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessToken } from './AccessTokenContext';

const CallbackPage = () => {
  const { setAccessToken } = useAccessToken();
  const navigate = useNavigate();
  const clientID = "46aac0a62444457fb2e169c39e4e0b78";
  const clientSecret = "8499e72445b540e58e095cfae15fb349";
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
              redirect_uri: 'http://localhost:5173/callback',
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
  }, [setAccessToken, navigate]);

  useEffect(() => {
    // Navigate to '/' if an error occurs
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  return <div>Processing...</div>;
};

export default CallbackPage;
