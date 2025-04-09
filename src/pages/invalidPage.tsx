import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Error Illustration */}
        <div className="bg-blue-600 py-8 px-6 flex justify-center">
          <div className="relative">
            <div className="text-9xl font-bold text-white opacity-20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
            </div>
          </div>
        </div>

        {/* Error Description */}
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              Oops! The page you're looking for doesn't exist or has been moved.
              We suggest you go back to the homepage.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go Home
              </button>

              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Contact Developer Section */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Need Help?
            </h2>
            <p className="text-gray-600 mb-4">
              If you believe this is an error, please contact the developer:
            </p>
            <a
              href="mailto:contact@codextarun.xyz"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              contact@codextarun.xyz
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Copyright © 2025{" "}
          <a
            href="https://www.codextarun.xyz"
            className="text-blue-600 hover:underline"
          >
            www.codextarun.xyz
          </a>
        </p>
        <p className="mt-1">All rights reserved.</p>
      </div>
    </div>
  );
};

export default NotFound;
