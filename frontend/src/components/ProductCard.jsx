import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white">
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
        <button
          onClick={() => addToCart(product._id)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg mt-3 hover:bg-blue-700 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
