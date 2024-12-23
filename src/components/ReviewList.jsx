import React, { useEffect, useState } from 'react';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch reviews from the API when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://river-server.vercel.app/api/review');
        const data = await response.json();

        if (response.ok) {
          setReviews(data);  // Set the reviews in state
        } else {
          setError(data.message || 'Error fetching reviews');
        }
      } catch (err) {
        setError('Error fetching reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Review</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Posted At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{review.userName}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{review.reviewText}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{new Date(review.postedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
