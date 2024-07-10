import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PopularMovies from './PopularMovies';
import TopRatedMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=c800c930b3f4ee9adb4590c3d967c485")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results.slice(0, 10))); // Limit to 8 slides
  }, []);

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...view more';
    }
    return text;
  };

  return (
    <div>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          swipeable={true}
        >
          {popularMovies.map(movie => (
            <div key={movie.id} className="posterImage md:h-[600px] relative">
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                alt={movie.original_title}
                className='mx-auto block w-full text-xs'
              />
              <div className="posterImage__overlay text-white absolute p-6 md:p-20 bottom-0 md:h-[70%] flex flex-col w-full justify-end items-start bg-gradient-to-t from-black via-transparent opacity-100 transition-opacity duration-300 hover:opacity-100">
                <div className="posterImage__title text-xl md:text-6xl font-semibold mb-1">
                  {movie.original_title}
                </div>
                <div className="posterImage_runtime text-sm md:text-lg mb-4">
                  {movie.release_date}
                  <span className="ml-4 md:ml-12">
                    {movie.vote_average.toFixed(1)}
                    <FontAwesomeIcon icon={faStar} className="ml-1" />
                  </span>
                </div>
                <div className="posterImage__description text-left italic text-xs md:text-base md:mb-1 md:w-1/2">
                  {truncateText(movie.overview, 20)}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <PopularMovies/>
      <TopRatedMovies/>
      <UpcomingMovies/>
    </div>
  );
}

export default Home;
