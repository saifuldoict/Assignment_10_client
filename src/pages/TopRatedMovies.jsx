import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "animate.css";

const TopRatedMovies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies/top-rated");
        const data = await res.json();
        setTopRatedMovies(data);
      } catch (err) {
        console.error("Failed to fetch top-rated movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) return <div>Loading top-rated movies...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 animate__animated animate__fadeInLeft animate__delay-1s">
        Top 5 Highest-Rated Movies
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRatedMovies.map((movie, index) => (
          <div
            key={movie._id}
            onClick={() => navigate(`/movies/${movie._id}`)} 
            className={`p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-gray-600 mt-1">Rating: {movie.rating}</p>
            <p className="text-gray-500 text-sm mt-1">{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
