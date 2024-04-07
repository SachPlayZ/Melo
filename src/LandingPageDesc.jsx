import React from "react";
import RecommendedMusic from "./RecommendedMusic";

const LandingPageDesc = () => {
  return (
    <div className="h-auto w-full bg-slate-950 flex flex-col">
      <div id="about" className="flex flex-col justify-center text-white pt-12">
        <h1 className="text-7xl font-bold text-center top-0">
          Welcome to Melo
        </h1>
        <p className="text-center mt-4 text-lg">
          Step up your music game with us ❤️
        </p>
      </div>
      <div className="h-auto w-full flex gap-10 justify-center my-16">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Find the Best Tunes
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Our music web app uses advanced algorithms to curate personalized
            recommendations tailored to your listening habits. Explore a vast
            library of tracks across genres to find your new favorite songs and
            embark on a musical journey.
          </p>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Compare Music Tastes
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Connect with others by comparing music preferences. Our feature
            allows you to see how your tastes align with friends, influencers,
            and strangers. Explore similarities and differences, sparking
            conversations and forging connections within our music-loving
            community.
          </p>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-neon">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            See what's the town listenin'
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Stay in tune with your town's musical pulse. Our feature provides
            real-time insights into local music scenes, trends, and emerging
            artists. From bustling cities to quaint suburbs, discover what
            resonates in your area and join the rhythm of your town's musical
            journey.
          </p>
        </div>
      </div>
      <RecommendedMusic />
    </div>
  );
};

export default LandingPageDesc;
