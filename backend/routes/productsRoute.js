const express = require("express");
const Product = require("../models/productsModel.js");
const User = require('../models/userModel');
const mongoose = require("mongoose")
const router = express.Router();

//get all products
router.get('/', async (req, res) => {
  try {
    const { filter, title, category } = req.query;
    let query = {};  // This will hold the final query object

    // Define filter options
    const filterOptions = {
      popular: { isPopular: true },
      sales: { isOnSale: true },
      bogo: { isBOGO: true },
      expensive: { price: { $gte: 400 } },
      new: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    };

    // Apply filter if exists
    if (filter && filterOptions[filter]) {
      query = { ...query, ...filterOptions[filter] }; // Merge the filter query with main query
    }

    // Apply title search filter if provided
    if (title) {
      query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive regex search for title
    }

    // Apply category search filter if provided
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive regex search for category
    }

    const products = await Product.find(query); // Fetch products using the query

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products); // Return the fetched products
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    // Validate ID format before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Express route for adding reviews
router.post('/:id/review', async (req, res) => {
  try {
    const { id } = req.params;  // Get productId from params
    const { user, comment, rating } = req.body;  // Get review data from body

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Ensure rating is valid before pushing
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    product.reviews.push({ user, comment, rating });

    // Calculate the new average rating (rounded to 1 decimal place)
    product.rating = (
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    ).toFixed(1); // Keep one decimal place

    await product.save();
    res.json({ message: 'Review added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id/review/:reviewId', async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Filter out the review to be deleted
    product.reviews = product.reviews.filter((rev) => rev._id.toString() !== reviewId);

    // Update the average rating after deletion
    if (product.reviews.length > 0) {
      product.rating = (
        product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
      ).toFixed(1);
    } else {
      product.rating = 0;
    }

    await product.save();
    res.json({ message: 'Review deleted successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id/review/:reviewId', async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { comment, rating } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const review = product.reviews.find((rev) => rev._id.toString() === reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;

    // Update average rating
    product.rating = (
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    ).toFixed(1);

    await product.save();
    res.json({ message: 'Review updated successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add to Cart Route
router.post('/products/:id/add-to-cart', async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming cart functionality is handled elsewhere
    res.json({ message: `Product with ID ${id} added to cart` });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/:id/love", async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: "User ID required" });

    if (product.lovedUsers.includes(userId)) {
      // Unloved: Remove user from lovedUsers and decrease loveCount
      product.lovedUsers = product.lovedUsers.filter((id) => id.toString() !== userId.toString());
      product.loveCount = Math.max(0, product.loveCount - 1); // Prevent negative count
    } else {
      // Loved: Add user to lovedUsers and increase loveCount
      product.lovedUsers.push(userId);
      product.loveCount += 1;
    }


    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//  Increase Share Count
router.post("/:id/share", async (req, res) => {
  try {
    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Update the share count
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { shareCount: 1 } }, // Increment the shareCount by 1
      { new: true } // Return the updated document
    );

    // Handle case where product is not found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the updated product
    res.json(product);
  } catch (error) {
    console.error(error);
    // Return a generic server error in case of failure
    res.status(500).json({ error: "Server error" });
  }
});

// Increase View Count
router.post("/:id/view", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add product to user's wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body; // Get the user ID and product ID from the request

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product is already in the wishlist' });
    }

    // Add product to the wishlist
    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
});

// Get user's wishlist
router.get("/", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and populate the wishlist with product details
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.wishlist); // Send back the populated wishlist
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
});



// Export the router
module.exports = router;
