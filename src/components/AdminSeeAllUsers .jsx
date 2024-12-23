import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const AdminSeeAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  // http://localhost:5000/api/users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://river-server.vercel.app/api/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <Navbar />
      <div className="w-full max-w-4xl px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin - See All Users</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center px-4 py-2">
                  No users available.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-500 hover:text-blue-700 px-4 py-2 border rounded-md mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 px-4 py-2 border rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSeeAllUsers;
