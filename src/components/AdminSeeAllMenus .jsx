import React, { useState, useEffect } from "react";
import "../menu.css"; // If you still need your custom styles
import Navbar from "./Navbar";

const AdminSeeAllMenus = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the menu items from the API
  // https://river-server.vercel.app/api/river
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://river-server.vercel.app/api/river"); // API endpoint
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <Navbar />
      <div className="w-full max-w-4xl px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin - See All Menu Items</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-2">
                  No menu items available.
                </td>
              </tr>
            ) : (
              menuItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.category}</td>
                  <td className="px-4 py-2 border-b">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-500 hover:text-blue-700 px-4 py-2 border rounded-md">Edit</button>
                    <button className="text-red-500 hover:text-red-700 px-4 py-2 border rounded-md ml-2">Delete</button>
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

export default AdminSeeAllMenus;
