import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";


const MyCollectionPage = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-10-server-fcwh.vercel.app/movies?addedBy=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        My Movie Collection
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </p>
                <Link
                  to={`/movies/${movie._id}`}
                  className="w-full text-center inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollectionPage;
