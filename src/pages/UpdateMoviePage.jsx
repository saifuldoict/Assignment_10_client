import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";


const UpdateMoviePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
    addedBy: "",
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`https://assignment-10-server-fcwh.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
       
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!user?.email) {
      toast.error("You must be logged in to update a movie!");
      return;
    }


    fetch(`https://assignment-10-server-fcwh.vercel.app/movies/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
     
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update movie");
        return res.json();
      })
      .then(() => {
        toast.success("Movie updated successfully!");
        navigate(`/movies/${id}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update movie. Try again!");
      });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md text-pink-700">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>


        <div>
          <label className="font-semibold">Rating:</label>
          <input
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>


        <div>
          <label className="font-semibold">Genre:</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

  
        <div>
          <label className="font-semibold">Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            value={movie.releaseYear}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>


        <div>
          <label className="font-semibold">Director:</label>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>


        <div>
          <label className="font-semibold">Cast:</label>
          <input
            type="text"
            name="cast"
            value={movie.cast}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>


        <div>
          <label className="font-semibold">Duration (min):</label>
          <input
            type="number"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

  
        <div>
          <label className="font-semibold">Plot Summary:</label>
          <textarea
            name="plotSummary"
            value={movie.plotSummary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
          />
        </div>

 
        <div>
          <label className="font-semibold">Language:</label>
          <input
            type="text"
            name="language"
            value={movie.language}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

      
        <div>
          <label className="font-semibold">Country:</label>
          <input
            type="text"
            name="country"
            value={movie.country}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

     
        <div>
          <label className="font-semibold">Poster URL:</label>
          <input
            type="text"
            name="posterUrl"
            value={movie.posterUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

    
        <div>
          <label className="font-semibold">Added By:</label>
          <input
            type="text"
            name="addedBy"
            value={movie.addedBy}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="font-semibold">Added Date:</label>
          <input
            type="text"
            name="addedDate"
            value={new Date(movie.createdAt).toLocaleDateString()}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMoviePage;
