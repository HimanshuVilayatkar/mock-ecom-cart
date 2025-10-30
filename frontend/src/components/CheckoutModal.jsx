import React, { useState } from "react";
import API from "../services/api";

const CheckoutModal = ({ cart = [], close }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.price || 0), 0)
    : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email) {
      alert("Please enter name and email!");
      return;
    }

    const payload = {
      cartItems: cart.cartItems,
      name: form.name,
      email: form.email,
    };

    try {
      setLoading(true);
      const { data } = await API.post("/checkout", payload);
      setReceipt(data.receipt);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed, check console for details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-8 rounded-2xl w-[400px] text-white shadow-2xl border border-gray-700">
        {!receipt ? (
          <>
            {/* 🛍️ Checkout Header */}
            <h2 className="text-2xl font-bold mb-2 text-center text-green-400">
              Checkout
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Total payable:{" "}
              <span className="text-xl text-white font-semibold">
                ₹{totalPrice}
              </span>
            </p>

            {/* 🧾 Form */}
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all"
              />
            </div>

            {/* 🧩 Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={close}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                  loading
                    ? "bg-green-700 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </>
        ) : (
          /* ✅ Success State */
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-500 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Order Confirmed 🎉
            </h2>
            <p className="text-gray-400 mb-4">Your payment was successful!</p>

            {/* Receipt Details */}
            <div className="bg-gray-800/70 rounded-lg p-4 text-left space-y-2 shadow-md">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Name:</span>
                <span>{receipt.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email:</span>
                <span>{receipt.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total:</span>
                <span className="text-green-400 font-medium">
                  ₹{receipt.total}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pt-1 border-t border-gray-700">
                <span>Order Time:</span>
                <span>{new Date(receipt.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={close}
              className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-all shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
