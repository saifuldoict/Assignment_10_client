import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const RegisterPage = () => {
  const {signInWithGoogle} = useContext(AuthContext);

  const handleGoogleSignIn = ()=>{
    signInWithGoogle()
    .then(result=>{
    
      // create user object to send to the backend
      const newUser = {
        name: result.displayName,
        email: result.email,
        image: result.photoURL,
      };

      // send user data to the backend
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then(res=>res.json())
      
    })
    .catch(error=>{
      console.error(error);
    })  
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-4.5">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Register
        </h2>

        {/* Login Link */}
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login Now
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter your profile image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
