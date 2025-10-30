import React, { useEffect, useState } from "react";
import API from "../services/api";
import Cart from "../components/Cart";
import CheckoutModal from "../components/CheckoutModal";

const CartPage = () => {
  const [cart, setCart] = useState({ cartItems: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  return (
    <div className="p-4">
      <Cart cart={cart} removeFromCart={removeFromCart} />
      {cart.cartItems.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
        >
          Checkout
        </button>
      )}
      {showCheckout && <CheckoutModal cart={cart} close={() => setShowCheckout(false)} />}
    </div>
  );
};

export default CartPage;
