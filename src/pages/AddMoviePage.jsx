import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddMoviePage = () => {
  const { user, loading } = useContext(AuthContext); 
  const navigate = useNavigate();
  const toastShown = useRef(false); 

 
  useEffect(() => {
    if (!loading && !user && !toastShown.current) {
      toastShown.current = true; 
      toast.warn("Please log in to add a movie.");
      navigate("/login");
    }
  }, [user, loading, navigate]);


  if (!user) return null;


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: form.releaseYear.value,
      director: form.director.value,
      cast: form.actors.value,
      rating: form.rating.value,
      duration: form.duration.value,
      plotSummary: form.description.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      addedBy: user.email,
    };

    fetch("https://assignment-10-server-fcwh.vercel.app/movies/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          toast.success(" Movie added successfully!");
          form.reset();
          navigate("/movies/my-collection");
        } else {
          toast.error("Failed to add movie.");
        }
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg text-pink-400">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Movie</h2>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            required
            className="mt-1  block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Director</label>
          <input
            type="text"
            name="director"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cast</label>
          <input
            type="text"
            name="actors"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Plot Summary</label>
          <textarea
            name="description"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Poster URL</label>
          <input
            type="text"
            name="posterUrl"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Language</label>
          <input
            type="text"
            name="language"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Added By</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
           <label className="block text-sm font-medium">Added Date</label>
          <input
            type="text"
            name="date"
            value={new Date().toLocaleDateString()}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMoviePage;
