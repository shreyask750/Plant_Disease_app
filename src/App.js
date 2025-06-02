import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Product from "./pages/product";
import Reports from "./pages/reports";
import About from "./pages/about";

function App() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setImage(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo"><span>Leaf</span>Guard</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/about">About Us</Link>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={
            <div className="upload-section">
              <h2>Upload Crop Leaf Image</h2>
              <p>Let our AI analyze your crop leaf for potential diseases.</p>

              <label className="label">Select Image File</label>
              <div className="upload-box">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="button-group">
                  <button className="analyze-btn">🍃 Analyze Leaf</button>
                  <button className="reset-btn" onClick={handleReset}>🔄 Reset</button>
                </div>
              </div>

              {image && (
                <div className="image-preview">
                  <p>Image Preview:</p>
                  <img src={image} alt="Preview" />
                </div>
              )}
            </div>
          } />
          <Route path="/product" element={<Product />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
