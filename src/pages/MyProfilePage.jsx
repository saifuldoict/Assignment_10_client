import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const { user, loading, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  if (loading)
    return <p className="text-center mt-20 text-gray-600 text-lg">Loading...</p>;
  if (!user)
    return (
      <p className="text-center mt-20 text-gray-700 text-lg">
        You must be logged in to view this page.
      </p>
    );

  const handleUpdate = async () => {
    if (!name.trim() || !photoURL.trim()) {
      toast.warning("Please fill in all fields before updating.");
      return;
    }

    setUpdating(true);
    try {
      await updateUserProfile({ displayName: name, photoURL });
      toast.success(" Profile updated successfully!");
    } catch (err) {
      toast.error( err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt={name || "User"}
          className="h-32 w-32 rounded-full mx-auto mb-6 object-cover border-4 border-pink-400 shadow-md"
        />

        <div className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered w-full border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <button
          onClick={handleUpdate}
          className={`mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            updating && "opacity-70 cursor-not-allowed"
          }`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
    
      </div>
    </div>
  );
};

export default MyProfilePage;