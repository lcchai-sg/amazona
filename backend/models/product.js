import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  brand: { type: String, },
  category: { type: String, },
  description: { type: String, },
  availableSizes: { type: [String], },
  price: { type: Number, default: 0, },
  original: { type: Number, default: 0, },
  isFreeShipping: { type: Boolean, default: false, },
  image: { type: String, },
  rating: { type: Number, default: 0, },
  numReviews: { type: Number, default: 0, },
  onHand: { type: Number, default: 0, },
});

const Product = mongoose.model("Product", productSchema);

export default Product;