import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();

  // States for form fields
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(""); // To show error messages
  const [success, setSuccess] = useState(""); // To show success message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send both text and file data
    const formData = new FormData();
    formData.append("name", roomName); // Backend expects 'name'
    formData.append("description", description);
    formData.append("pricePerDay", price); // Backend expects 'pricePerDay'
    if (image) {
      formData.append("roomImage", image); // Backend expects 'roomImage'
    }
// http://localhost:5000/api/admin/rooms
    try {
      const response = await fetch("https://river-server.vercel.app/api/admin/rooms", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send JWT token for authentication
        },
        body: formData, // Send FormData which includes text and file data
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Room added successfully!");
        setError(""); // Clear error if success
        // Reset the form fields after successful submission
        setRoomName("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        // If not authorized or other error
        setError(data.message || "An error occurred. Please try again.");
        setSuccess(""); // Clear success message in case of error
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
      setSuccess(""); // Clear success message in case of error
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">

       <div className="text-center">
        <button className="bg-indigo-950 text-white p-4 font-extrabold">
        <Link to="/dash">GO BACK TO DASHBOARD</Link>
        </button>
       </div>
       
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Room</h2>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="roomName">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room description"
              rows="4"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="price">
              Price Per Day
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price per day"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="image">
              Room Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Room
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AddRoom;
