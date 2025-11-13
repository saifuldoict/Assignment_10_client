import React, { useContext } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const ShowMovie = ({ movie }) => {
  const { _id, title, rating, genre, releaseYear, posterUrl } = movie;
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(AuthContext);

  const isInWatchlist = watchlist.some((m) => m._id === _id);
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(_id);
      toast.info(`${title} removed from your Watchlist`, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      addToWatchlist(movie);
      toast.success(`${title} added to your Watchlist`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
      <img src={posterUrl} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>

        <div className="flex items-center text-yellow-500 text-sm mb-2">
          {stars.map((filled, index) => (
            <Star
              key={index}
              className={`w-4 h-4 mr-1 ${
                filled ? "fill-yellow-500" : "fill-gray-300"
              }`}
            />
          ))}
          <span className="font-medium text-gray-700 ml-1">{rating}</span>
        </div>

        <p className="text-gray-600 text-sm mb-1">
          <span className="font-semibold">Genre:</span> {genre}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold">Release:</span> {releaseYear}
        </p>

        <div className="flex flex-col gap-2">
          <Link
            to={`/movies/${_id}`}
            className="inline-block bg-blue-600 w-full text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Details
          </Link>

          <button
            onClick={handleWatchlistClick}
            className={`inline-block w-full text-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              isInWatchlist
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowMovie;
