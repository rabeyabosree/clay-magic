const express = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productsModel");
const mongoose = require("mongoose");

const router = express.Router();

// create order
router.post("/create", async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Calculate total order amount
    let totalAmount = 0;
    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    // Create the order
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// get single order details
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching orders for user:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const orders = await Order.find({ userId }).populate("products.productId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// order statu tracking
router.put("/status", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
});

module.exports = router;
