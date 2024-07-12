import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { getTopRatedMovies } from "../API/MovieApi";

const TopRatedMovies = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopRatedMovies();
                setMovieList(data);
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="px-2 md:px-8 lg:px-16 xl:px-32 py-10 bg-gradient-to-b from-black via-gray-900 to-black bg-opacity-90">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-white">TOP RATED</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1">
                {movieList.map(movie => (
                    <Cards key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default TopRatedMovies;
