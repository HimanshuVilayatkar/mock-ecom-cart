import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">🛍️ Your Cart</h2>
      {cart.cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cart.cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{item.productId.name}</span>
              <span>₹{item.productId.price} × {item.qty}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="font-semibold mt-4 text-right">
            Total: ₹{cart.total}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
