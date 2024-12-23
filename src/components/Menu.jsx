import React, { useState, useEffect } from "react";
import "../menu.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Burger");
  const [loading, setLoading] = useState(true);

  // Fetch the menu items from the API
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

  // Filter menu items based on selected category
  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  // Handle tab change
  const handleTabChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="menu">
        <div className="tabs">
          {/* Tabs for categories */}
          <button
            className={`tab ${selectedCategory === "Burger" ? "active" : ""}`}
            onClick={() => handleTabChange("Burger")}
          >
            Burger
          </button>
          <button
            className={`tab ${selectedCategory === "Pizza" ? "active" : ""}`}
            onClick={() => handleTabChange("Pizza")}
          >
            Pizza
          </button>
          <button
            className={`tab ${selectedCategory === "Steak" ? "active" : ""}`}
            onClick={() => handleTabChange("Steak")}
          >
            Steak
          </button>
        </div>

        <div className="menu-items">
          {/* Display menu items based on selected category */}
          {filteredItems.length === 0 ? (
            <p>No items available in this category.</p>
          ) : (
            filteredItems.map((item) => (
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-item-image"
                />
                <div className="menu-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Menu;
