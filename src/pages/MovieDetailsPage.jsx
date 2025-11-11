import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { Star } from "lucide-react";

const MovieDetailsPage = () => {
  const loaderMovie = useLoaderData();
  const [movie, setMovie] = useState(loaderMovie);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://assignment-10-server-fcwh.vercel.app/${loaderMovie._id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [loaderMovie._id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    fetch(`https://assignment-10-server-fcwh.vercel.app/movies/${movie._id}`, {
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
     
    navigate(`/movies/update/${movie._id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl text-pink-700 font-bold mb-4 text-center">{movie.title}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full md:w-1/2 h-[500px] object-cover rounded-lg shadow-md"
        />

        <div className="md:w-1/2 md:ml-6 text-left text-black">
          <p className="text-lg mb-2"><span className="font-semibold">Rating:</span> {movie.rating}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Genre:</span> {movie.genre}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Director:</span> {movie.director}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Cast:</span> {movie.cast}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Duration:</span> {movie.duration} min</p>
          <p className="text-lg mb-2"><span className="font-semibold">Plot Summary:</span> {movie.plotSummary}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Language:</span> {movie.language}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Country:</span> {movie.country}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Added By:</span> {movie.addedBy}</p>

        
          {user?.email === movie?.addedBy && (
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
