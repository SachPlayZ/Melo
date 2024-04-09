import React, { useState, useEffect } from 'react';
import { useAccessToken } from './AccessTokenContext';

const RecommendedMusic = () => {
  const { accessToken } = useAccessToken();
  const [recommendedMusic, setRecommendedMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [userTopArtists, setUserTopArtists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchTopArtists = async () => {
      try {
        const topArtistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!topArtistsResponse.ok) {
          throw new Error("Failed to fetch top artists");
        }
        const topArtistsData = await topArtistsResponse.json();
        setUserTopArtists(topArtistsData.items);
      } catch (error) {
        setError(error);
      }
    };

    fetchTopArtists();
  }, [accessToken]);

  useEffect(() => {
    if (userTopArtists.length === 0) return;

    const seedArtists = userTopArtists.map(artist => artist.id).join(",");
    // const query = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}&limit=30`;
    const query = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA`;

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(query, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        setRecommendedMusic(data.tracks);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchRecommendations();
  }, [accessToken, userTopArtists]);

  const handleUp = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : recommendedMusic.length - 1
    );
  };

  const handleDown = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < recommendedMusic.length - 1 ? prevIndex + 1 : 0
    );
  };

  const togglePlayPause = (music) => {
    if (!audio || audio.src !== music.track.preview_url) {
      const newAudio = new Audio(music.track.preview_url);
      setAudio(newAudio);
      newAudio.play();
      setCurrentIndex(recommendedMusic.indexOf(music));
    } else {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  if (!accessToken) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Login to Spotify to show Recommendations
        </h1>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2 items-center pb-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Recommended Music
      </h1>
      <button onClick={handleUp}>
        <img src="/upload.png" alt="Up" className="h-4 w-4 invert" />
      </button>
      {recommendedMusic.map((music, index) => (
        <div
          key={music.id}
          className={`transition-all duration-500 ${
            index === currentIndex
              ? "flex items-center h-16 w-1/2 p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon"
              : "hidden"
          }`}
        >
          <div className="relative">
            <img
              src={music.track.album.images[0].url}
              alt="Album Cover"
              className="h-10 w-10 rounded-lg"
            />
            <button
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              onClick={() => togglePlayPause(music)}
            >
              {audio && audio.src === music.track.preview_url && !audio.paused ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h4v12H4zm12 0h4v12h-4z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 4h12v16H6z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="ms-6 flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {music.track.name}
            </h1>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-xs">
              {music.track.artists[0].name}
            </p>
          </div>
        </div>
      ))}
      <button onClick={handleDown}>
        <img src="download.png" alt="Down" className="h-4 w-4 invert" />
      </button>
    </div>
  );
};

export default RecommendedMusic;
