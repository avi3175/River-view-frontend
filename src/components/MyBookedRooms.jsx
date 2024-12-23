import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const MyBookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      const token = localStorage.getItem("token"); // Assuming token is saved in localStorage after login
      if (!token) {
        setError("You must be logged in to see your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://river-server.vercel.app/api/my-booked-rooms",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the request
            },
          }
        );
        setBookedRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your booked rooms.");
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">MY BOOKED ROOMS</h2>
        {bookedRooms.length === 0 ? (
          <p className="text-center">You have no booked rooms.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Room Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Price Per Day</th>
                  <th className="px-4 py-2 text-left">Booked On</th>
                </tr>
              </thead>
              <tbody className="bg-black text-white font-extrabold">
                {bookedRooms.map((room, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{room.roomName}</td>
                    <td className="px-4 py-2">
                      {room.roomDescription.length > 50
                        ? `${room.roomDescription.substring(0, 50)}...`
                        : room.roomDescription}
                    </td>
                    <td className="px-4 py-2">${room.roomPricePerDay} / day</td>
                    <td className="px-4 py-2">
                      {new Date(room.bookedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookedRooms;
