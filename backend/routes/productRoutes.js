import express from 'express';
import Product from '../models/product';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const searchKeyword = req.query.searchKeyword;

    let filter;
    if (category) filter = { ...filter, category: category.toLowerCase() };
    if (searchKeyword) filter = {
      ...filter,
      name: {
        $regex: req.query.searchKeyword,
        $options: 'i',
      }
    };

    console.log('filter >>>', filter)

    const sortOrder = req.query.sortOrder ?
      (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
      : { id: -1 };

    const products = await Product.find(filter).sort(sortOrder);
    res.status(201).send(products);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ id });
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Product not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      availableSizes: req.body.availableSizes,
      price: req.body.price,
      original: req.body.original,
      isFreeShipping: req.body.isFreeShipping,
      image: req.body.image,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      onHand: req.body.onHand,
    });

    const result = await product.save();
    res.status(200).send({ message: 'New product created!', data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.description = req.body.description;
      product.availableSizes = req.body.availableSizes;
      product.price = req.body.price;
      product.original = req.body.original;
      product.isFreeShipping = req.body.isFreeShipping;
      product.image = req.body.image;
      product.rating = req.body.rating;
      product.numReviews = req.body.numReviews;
      product.onHand = req.body.onHand;
    } else {
      res.status(404).send({ message: 'Product not found!' });
    }

    const result = await product.save();
    res.status(200).send({ message: 'Product updated!', data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(id);
      res.status(200).send({ message: 'Product deleted!' });
    } else {
      res.status(404).send({ message: 'Product not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;