import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { Link } from "react-router";
const MyCollectionPage = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/movies?addedBy=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Movie deleted successfully!");
          setMovies(movies.filter((movie) => movie._id !== id));
        }
      });
  };

  const handleUpdate =()=>{
    
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Movie Collection</h2>
      {movies.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t added any movies yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
              <p className="text-gray-600 mb-2">{movie.genre}</p>
              <p className="text-gray-500 text-sm mb-3">
                Rating: {movie.rating} | Year: {movie.releaseYear}
              </p>

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => navigate(`/movies/update/${movie._id}`)} 
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <Link
                  to={`/movies/${movie._id}`}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                >
                  View
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
