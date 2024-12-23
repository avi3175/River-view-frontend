import React, { useEffect, useState } from "react";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://river-server.vercel.app/api/rooms"
        );
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rooms");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookRoom = async (roomId) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!token) {
      setBookingError("You must be logged in to book a room.");
      return;
    }

    try {
      const response = await axios.post(
        "https://river-server.vercel.app/api/book-room",
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingSuccess(response.data.message);
      setBookingError(null); // Reset any previous error message
    } catch (err) {
      setBookingError(
        err.response?.data?.message || "Failed to book the room."
      );
      setBookingSuccess(null); // Reset any previous success message
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">Available Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={
                room.imageUrl
                  ? `https://river-server.vercel.app${room.imageUrl}` // Use Vercel URL in production
                  : "https://via.placeholder.com/300" // Fallback to placeholder image if no image is available
              }
              alt={room.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {room.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {room.description.length > 100
                  ? `${room.description.substring(0, 100)}...`
                  : room.description}
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-4">
                ${room.pricePerDay} / day
              </p>
              <button
                onClick={() => handleBookRoom(room._id)}
                className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookingError && (
        <div className="text-red-500 text-center mt-4">{bookingError}</div>
      )}
      {bookingSuccess && (
        <div className="text-green-500 text-center mt-4">{bookingSuccess}</div>
      )}
    </div>
  );
};

export default Rooms;
