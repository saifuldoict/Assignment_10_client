import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";
const MyWatchList = () => {
  const { watchlist, removeFromWatchlist } = useContext(AuthContext);

  if (!watchlist || watchlist.length === 0) {
    return <h2 className="text-center mt-10">Your watchlist is empty!</h2>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">My Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {watchlist.map((movie) => (
          <div key={movie._id} className="border p-3 rounded shadow">
            <Link to={`/movies/${movie._id}`}>
              <img src={movie.posterUrl} alt={movie.title} className="mb-2 w-full h-[200px]" />
              <h3 className="font-semibold">{movie.title}</h3>
            </Link>
            <button
              onClick={() => removeFromWatchlist(movie._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWatchList;
