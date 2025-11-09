import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const UpdateMoviePage = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState({
    title: "",
    rating: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    duration: "",
    plotSummary: "",
    language: "",
    country: "",
    posterUrl: "",
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (user?.email !== movie.addedBy) {
      alert("You are not authorized to update this movie");
      return;
    }

    fetch(`http://localhost:5000/movies/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          alert("Movie updated successfully!");
          navigate(`/movies/${id}`); 
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Movie</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {Object.keys(movie).map((key) => (
          key !== "_id" && key !== "addedBy" && (
            <div key={key}>
              <label className="block font-semibold mb-1">{key}</label>
              <input
                type="text"
                name={key}
                value={movie[key] || ""}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          )
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMoviePage;
