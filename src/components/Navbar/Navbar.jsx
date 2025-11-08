import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, signOutUser} = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        
        // Sign-out successful.
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      }); 

    // Sign out logic here
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600 cursor-pointer">
            MovieMaster Pro
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/allMovies" className="hover:text-blue-600">All Movies</Link>
           {
              user && <>
                <Link to="/myCollection" className="hover:text-blue-600">My Collection</Link>
               
              </>
            }
            
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            
            <Link to ="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Register
            </Link>
            {
              user? <span className="px-4 py-2 text-gray-700">Hello, {user.displayName}
                        <button onClick={handleSignOut} className="ml-2 text-red-600 hover:underline ">Sign Out</button>
                    </span>:
                    <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Login
            </Link>


            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m0 6H4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-2">
             <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/allMovies" className="hover:text-blue-600">All Movies</Link>
            {
              user && <>
                <Link to="/myCollection" className="hover:text-blue-600">My Collection</Link>
                
              </>
            }
           
            <div className="flex gap-2 mt-3">
              <Link to="/login" className="w-1/2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Login
              </Link>
              <Link to ="/register" className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
