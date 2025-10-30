
import CartItem from "../models/cartItem.js";
import Product from "../models/product.js";


export const getCart = async (req, res) => {
  try {
    let cartItems = await CartItem.find().populate("productId");

    // Filter out cart items whose products no longer exist
    cartItems = cartItems.filter((item) => item.productId);

    const total = cartItems.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * (item.qty || 1),
      0
    );

    res.json({ cartItems, total });
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};


// @desc Add item to cart
// @route POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    console.log("🟢 Received:", { productId, qty });

    const product = await Product.findById(productId);
    if (!product) {
      
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await CartItem.findOne({ productId });
    if (cartItem) {
      
      cartItem.qty += qty;
      await cartItem.save();
    } else {
  
      cartItem = await CartItem.create({ productId, qty });
    }

    
    res.status(201).json(cartItem);
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Cart item not found" });

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
};
