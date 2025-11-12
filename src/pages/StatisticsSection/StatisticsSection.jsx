import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilm, FaUsers } from "react-icons/fa";

const StatisticsSection = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://assignment-10-server-fcwh.vercel.app/movies");
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://assignment-10-server-fcwh.vercel.app/users");
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

  if (loadingMovies || loadingUsers) {
    return (
      <div className="text-center py-12 text-lg font-semibold animate-pulse">
        Loading statistics...
      </div>
    );
  }

  return (
    <div className="mt-12 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center w-full text-[#d72050]">
        Statistics of Movies and Users
      </h1>

      <div className="flex flex-wrap justify-center gap-8 py-12 bg-gray-100 rounded-2xl shadow-lg">
   
        <motion.div
          className="p-8 bg-white rounded-2xl shadow-md text-center w-64 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <FaFilm className="text-6xl text-[#d72050] mx-auto mb-4" />
          <p className="text-5xl font-bold text-[#d72050]">{totalMovies}</p>
          <p className="mt-2 text-gray-600 text-lg">Total Movies</p>
        </motion.div>

  
        <motion.div
          className="p-8 bg-white rounded-2xl shadow-md text-center w-64 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaUsers className="text-6xl text-[#d72050] mx-auto mb-4" />
          <p className="text-5xl font-bold text-[#d72050]">{totalUsers}</p>
          <p className="mt-2 text-gray-600 text-lg">Total Users</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsSection;
