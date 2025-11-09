import React, { useEffect, useState } from "react";

const StatisticsSection = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch total movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies");
        const data = await res.json();
        setTotalMovies(data.length);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchMovies();
  }, []);

  // Fetch total users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setTotalUsers(data.length);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  if (loadingMovies || loadingUsers) return <div>Loading statistics...</div>;

  return (
    <div className="mt-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center w-full"> Statistics of movies and users</h1>
        <div className="flex justify-center gap-8 py-12 bg-gray-100 rounded-xl shadow-md">
        
      <div className="p-6 bg-white rounded-xl shadow-md text-center">
        <p className="text-5xl font-bold text-[#d72050]">{totalMovies}</p>
        <p className="mt-2 text-gray-600">Total Movies</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md text-center">
        <p className="text-5xl font-bold text-[#d72050]">{totalUsers}</p>
        <p className="mt-2 text-gray-600">Total Users</p>
      </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
