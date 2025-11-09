import React from "react";

import { Star } from "lucide-react";
import { Link } from "react-router";

const showMovie = ({ movie }) => {
  const { _id, title, rating, genre, releaseYear, posterUrl } = movie;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
        <div className="flex items-center text-yellow-500 text-sm mb-2">
          <Star className="w-4 h-4 mr-1 fill-yellow-500" />
          <span className="font-medium text-gray-700">{rating}</span>
        </div>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-semibold">Genre:</span> {genre}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold">Release:</span> {releaseYear}
        </p>
        <Link
          to={`/movies/${_id}`}
          className="inline-block bg-blue-600 w-full text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default showMovie;
