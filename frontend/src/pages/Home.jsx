import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-10">
      {/* 🏷️ Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
          🛍️ Explore Our Products
        </h1>
        <p className="text-gray-400">
          Handpicked gadgets curated just for you!
        </p>
      </div>

      {/* 🛒 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="group bg-gradient-to-br from-[#1b1b1b] to-[#2a2a2a] border border-gray-800 rounded-2xl shadow-xl hover:shadow-green-500/10 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-5"
          >
            <div className="relative w-full h-40 flex items-center justify-center bg-gray-900 rounded-xl mb-4">
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="h-32 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="font-semibold text-lg mb-1 group-hover:text-green-400 transition-colors">
              {p.name}
            </h2>
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">
              {p.description || "High-quality tech product at best price."}
            </p>
            <p className="text-green-400 font-bold text-lg mb-4">₹{p.price}</p>

            <button
              onClick={() => addToCart(p._id)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
