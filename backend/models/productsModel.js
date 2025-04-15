const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
    isBOGO: { type: Boolean, default: false },
    stock: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    reviews: [
      {
        user: { type: String, required: true, trim: true },
        comment: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    loveCount: { type: Number, default: 0, min: 0 },
    lovedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shareCount: { type: Number, default: 0, min: 0 },
    viewCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Virtual for review count
productSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

// Text index for searching
productSchema.index({ title: "text", category: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

