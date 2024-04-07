import React, { useEffect } from 'react';
import { useAccessToken } from './AccessTokenContext';

const RecommendedMusic = () => {
  const { accessToken } = useAccessToken();
  const [recommendedMusic, setRecommendedMusic] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [audio, setAudio] = React.useState(null);

  useEffect(() => {
    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/playlists/4zO8LVE7qkU7rNwO41WZhu", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      return response.json();
    })
    .then((data) => {
      setRecommendedMusic(data.tracks.items);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
    });
  }, [accessToken]);

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
      <button
        onClick={handleUp}
        className="bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon py-4 px-4 rounded-full"
      >
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
      <button
        onClick={handleDown}
        className="bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon py-4 px-4 rounded-full"
      >
        <img src="download.png" alt="Down" className="h-4 w-4 invert" />
      </button>
    </div>
  );
};

export default RecommendedMusic;
