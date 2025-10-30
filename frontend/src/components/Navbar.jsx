import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        VibeCommerce 🛒
      </Link>
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
