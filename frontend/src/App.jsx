import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";

function App() {
  const [refresh, setRefresh] = useState(false);
  const refreshCart = () => setRefresh(!refresh);

  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="flex justify-between mb-6">
          <Link to="/" className="text-2xl font-bold text-blue-700">VibeCommerce</Link>
          <Link to="/cart" className="text-blue-500 font-medium">🛒 Cart</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home refreshCart={refreshCart} />} />
          <Route path="/cart" element={<CartPage key={refresh} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
