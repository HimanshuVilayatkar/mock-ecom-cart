
import Product from "../models/product.js";
export const getProducts = async (req, res) => {
  try {
    let products = await Product.find();


    if (products.length === 0) {
      products = await Product.insertMany([
        { name: "Wireless Headphones", price: 2999, image: "/images/headphones.jpg" },
        { name: "Smart Watch", price: 4999, image: "/images/watch.jpg" },
        { name: "Bluetooth Speaker", price: 1999, image: "/images/speaker.jpg" },
        { name: "Gaming Mouse", price: 1499, image: images/mouse.jpg },
        { name: "Mechanical Keyboard", price: 2499, image: "/images/keyboard.jpg" },
      ]);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
