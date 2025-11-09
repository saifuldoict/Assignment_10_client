import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";


const MovieDetailsPage = () => {
  const {
    _id,
    title,
    rating,
    genre,
    releaseYear,
    director,
    cast,
    duration,
    plotSummary,
    language,
    country,
    addedBy,
    posterUrl,
  } = useLoaderData();

  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/movies/${_id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [_id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/movies/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Movie deleted successfully!");
          navigate("/movies/my-collection");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = () => {
    navigate(`/movies/update/${_id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={posterUrl}
          alt={title}
          className="w-full md:w-1/2 h-[500px] object-cover rounded-lg shadow-md"
        />

        <div className="md:w-1/2 md:ml-6 text-left">
          <p className="text-lg mb-2">
            <span className="font-semibold">Rating:</span> {rating}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Genre:</span> {genre}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Release Year:</span> {releaseYear}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Director:</span> {director}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Cast:</span> {cast}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Duration:</span> {duration} min
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Plot Summary:</span> {plotSummary}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Language:</span> {language}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Country:</span> {country}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Added By:</span> {addedBy}
          </p>

          {/* ✅ Edit & Delete buttons (visible only to owner) */}
          {user?.email === addedBy && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
