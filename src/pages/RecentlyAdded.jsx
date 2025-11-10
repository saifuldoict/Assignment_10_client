// RecentlyAdded.jsx
import React, { useEffect, useState } from "react";
import "animate.css";
import { useNavigate } from "react-router";

const RecentlyAdded = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate(); 
  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const res = await fetch(
          "https://assignment-10-server-fcwh.vercel.app/movies/recently-added"
        );
        const data = await res.json();
        setRecentMovies(data);
      } catch (err) {
        console.error("Failed to fetch recently added movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMovies();
  }, []);

  if (loading) return <div>Loading recently added movies...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 animate__animated animate__fadeInLeft">
        Recently Added Movies
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentMovies.map((movie, index) => (
          <div
            key={movie._id}
             onClick={() => navigate(`/movies/${movie._id}`)} 
            className={`p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-gray-600 mt-1">Rating: {movie.rating}</p>
            <p className="text-gray-500 text-sm mt-1">{movie.genre}</p>
            <p className="text-gray-400 text-xs mt-1">
              Added on: {new Date(movie.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
