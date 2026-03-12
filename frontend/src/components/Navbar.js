import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/products">Products</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/analytics">Analytics</Link>
    </div>
  );
}

export default Navbar;