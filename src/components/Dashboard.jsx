import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Get the user's role from localStorage (whether the user is admin or normal)
  const isAdmin = localStorage.getItem("isAdmin");

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">DASHBOARD</h2>
          <h2 className="text-2xl font-bold text-white">
            <Link to="/">HOME</Link>
          </h2>
          <button
            onClick={handleLogout}
            className="bg-rose-900 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Check if the user is an admin or normal user */}
        {isAdmin === "true" ? (
          // Admin Content
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Dashboard</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200">
                <h4 className="font-semibold text-lg text-blue-800">Add a Room</h4>
                <button
                  onClick={() => navigate("/goToAddRoom")}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Go to Add Room
                  {/* <Link to="goToAddRoom"></Link> */}
                </button>
              </div>

              <div className="bg-green-100 p-6 rounded-lg shadow-md hover:bg-green-200">
                <h4 className="font-semibold text-lg text-green-800">See All Users</h4>
                <button
                  onClick={() => navigate("/AdminSeeAllUsers")}
                  className="mt-2 text-green-500 hover:text-green-700"
                >
                  View Users
                </button>
              </div>

              <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:bg-yellow-200">
                <h4 className="font-semibold text-lg text-yellow-800">See All Menus</h4>
                <button
                  onClick={() => navigate("/AdminSeeAllMenus")}
                  className="mt-2 text-yellow-500 hover:text-yellow-700"
                >
                  View Menus
                </button>
              </div>

              <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:bg-purple-200">
                <h4 className="font-semibold text-lg text-purple-800">See All Rooms</h4>
                <button
                  onClick={() => navigate("/AdminSeeAllRooms")}
                  className="mt-2 text-purple-500 hover:text-purple-700"
                >
                  View Rooms
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Normal User Content
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">User Dashboard</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-900 p-6 rounded-lg shadow-md hover:bg-blue-950">
                <h4 className="font-semibold text-lg text-white">My Bookings</h4>
                <button
                  onClick={() => navigate("/myBookedRooms")}
                  className="mt-2 text-white hover:font-extrabold bg-blue-950 p-3 rounded-sm font-bold"
                >
                  View Bookings
                </button>
              </div>

              <div className="bg-indigo-900 p-6 rounded-lg shadow-md hover:bg-indigo-950">
                <h4 className="font-semibold text-lg text-white">Give a Review</h4>
                <button
                  onClick={() => navigate("/review")}
                  className="mt-2 text-white hover:font-extrabold bg-indigo-950 p-3 rounded-sm font-bold"
                >
                  Add Review
                </button>
              </div>

              <div className="bg-sky-900 p-6 rounded-lg shadow-md hover:bg-sky-950">
                <h4 className="font-semibold text-lg text-white">My Reviews</h4>
                <button
                  onClick={() => navigate("/seeReviews")}
                  className="mt-2 text-white hover:font-extrabold bg-sky-950 p-3 rounded-sm font-bold"
                >
                  View Reviews
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
