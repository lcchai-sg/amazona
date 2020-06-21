import express from 'express';
import Order from '../models/order';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(201).send(orders);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get("/mine", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get('/:id', isAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findOne({ _id });
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: 'Order not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    const result = await order.save();
    res.status(200).send({ message: 'New order created!', data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id/pay", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment = {
        paymentMethod: req.body.paymentMethod,
        paymentResult: {
          payerID: req.body.payerID,
          orderID: req.body.orderID,
          paymentID: req.body.paymentID
        }
      }
      const result = await product.save();
      res.status(200).send({ message: 'Order updated!', data: result });
    } else {
      res.status(404).send({ message: 'Order not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findById(_id);
    if (order) {
      const result = await Order.findByIdAndDelete(_id);
      res.status(200).send({ message: 'Order deleted!', result });
    } else {
      res.status(404).send({ message: 'Order not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;