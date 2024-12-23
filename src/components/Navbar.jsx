import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand Name */}
          <div className="flex-shrink-0 text-white font-semibold text-xl">
            <Link to="/">River-View</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:ml-6">
            <div className="flex space-x-4">
              {/* Menu Link */}
              <Link
                to="/menu"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Menu
              </Link>

              {isAuthenticated ? (
                // Show logout button if the user is authenticated
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                  <Link
                    to="/dash"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  {/* Show login/signup links if the user is not authenticated */}
                  <Link
                    to="/signup"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
