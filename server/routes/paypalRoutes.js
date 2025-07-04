const express = require('express');
const { createOrder, captureOrder } = require('../utils/paypal');
const router = express.Router();

router.post('/create-order', async (req, res) => {
  try {
    const { total } = req.body;
    const order = await createOrder(total);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating PayPal order');
  }
});

router.post('/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    const captured = await captureOrder(orderID);
    res.json(captured);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error capturing PayPal order');
  }
});

module.exports = router;