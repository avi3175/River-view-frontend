import React, { useState, useEffect } from "react";

const AdminSeeAllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
// http://localhost:5000/api/rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("https://river-server.vercel.app/api/rooms");
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const baseUrl = "http://localhost:5000"; // Your backend's base URL

  return (
    <div className="py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`${baseUrl}${room.imageUrl}`}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                <p className="text-gray-600">{room.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    ${room.pricePerDay} / day
                  </span>
                  <div className="flex space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      // Add edit functionality
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      // Add delete functionality
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminSeeAllRooms;
