// backend/controllers/checkoutController.js
import CartItem from "../models/cartItem.js";

export const checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    console.log("🧾 Checkout request received:");
    console.log("cartItems:", cartItems);
    console.log("name:", name);
    console.log("email:", email);

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid or empty cart" });
    }

    // ✅ Debug total calculation
    const total = cartItems.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const itemQty = item.qty || 1;
      return acc + itemPrice * itemQty;
    }, 0);
 

    const receipt = {
      name,
      email,
      total,
      timestamp: new Date().toISOString(),
    };

    // ⚠️ Comment this line out temporarily for debugging:
    // await CartItem.deleteMany();

    res.json({ message: "Checkout successful", receipt });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};
