import React from "react";
import { Link, useRouteError } from "react-router";


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4 animate__animated animate__bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2 animate__animated animate__fadeInDown">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 animate__animated animate__fadeInUp">
        Sorry, something went wrong.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition animate__animated animate__pulse animate__infinite"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;