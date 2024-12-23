import React, { useState } from "react";
import Navbar from "./Navbar";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the JWT token from localStorage (assuming it's stored after login)
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Please log in to post a review.");
      return;
    }

    if (!reviewText) {
      setMessage("Review text cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://river-server.vercel.app/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ reviewText }), // Send review text in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Show success message
        setReviewText(""); // Clear the review input after successful submission
      } else {
        setMessage(data.message || "Error posting review. Please try again."); // Show error message
      }
    } catch (err) {
      setMessage("Error posting review. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-lg mx-auto p-6 bg-gray-900 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          POST A REVIEW
        </h2>
        {message && (
          <p className="text-center text-lime-500 mb-4 font-extrabold">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            cols="50"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 py-2 px-4 bg-indigo-950 text-white rounded-lg focus:outline-none ${
                loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
