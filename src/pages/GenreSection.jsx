// GenreSection.jsx
import React from "react";
import { useNavigate } from "react-router";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Adventure",
  "Animation",
  "Fantasy",
];

const GenreSection = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
  
    navigate(`/movies/genre/${genre}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Browse by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className="cursor-pointer p-4 bg-white rounded-xl shadow-md hover:bg-[#d72050] text-black hover:text-white transition-colors text-center font-semibold"
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
