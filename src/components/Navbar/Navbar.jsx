import React, { useState, useContext } from "react";
import { ImCross } from "react-icons/im";
import { FiMenu, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const handleNavigation = (path) => {
    setLoading(true);
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 200);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md text-gray-800 relative z-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-center h-16 navbar">
            {/* Logo */}
            <div>
              <Link to={"/"} className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation("/")}
                  className="font-bold text-lg"
                >
                  MovieMaster Pro
                </button>
              </Link>
            </div>

            {/* Search Bar (desktop) */}
            <div className="hidden md:flex flex-1 justify-center px-6 relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full max-w-xs border border-gray-300 rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <FiSearch className="absolute left-[calc(95%-6rem)] top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 font-bold text-green-600">
              <ul className="flex items-center gap-6">
                <button
                  onClick={() => handleNavigation("/")}
                  className="link link-hover"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/movies")}
                  className="link link-hover"
                >
                  All Movies
                </button>
                <button
                  onClick={() => handleNavigation("/myCollection")}
                  className="link link-hover"
                >
                  My Collection
                </button>
                <button
                  onClick={() => handleNavigation("/add-movie")}
                  className="link link-hover"
                >
                  Add Movie
                </button>
                {user && (
                  <button
                    onClick={() => handleNavigation("/my-profile")}
                    className="link link-hover ml-5"
                  >
                    My Profile
                  </button>
                )}
              </ul>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="relative group flex items-center gap-2">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt={user.displayName || "User"}
                      className="h-10 w-10 rounded-full border border-gray-300 cursor-pointer"
                    />
                    <div className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {user.displayName || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="btn bg-green-500 text-white">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="btn btn-outline">Register</button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isOpen ? <ImCross /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md p-4 flex flex-col gap-4">
            {/* Search Bar (mobile) */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <FiSearch className="absolute left-[calc(95%-6rem)] top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            <button
              onClick={() => handleNavigation("/")}
              className="link link-hover"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/allMovies")}
              className="link link-hover"
            >
              All Movies
            </button>
            <button
              onClick={() => handleNavigation("/myCollection")}
              className="link link-hover"
            >
              My Collection
            </button>
            <button
                  onClick={() => handleNavigation("/add-movie")}
                  className="link link-hover"
                >
                  Add Movie
                </button>
            {user && (
              <button
                onClick={() => handleNavigation("/my-profile")}
                className="link link-hover"
              >
                My Profile
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName || "User"}
                  className="h-10 w-10 rounded-full"
                />
                <span>{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary w-full">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline w-full">Register</button>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
