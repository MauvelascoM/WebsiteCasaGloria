const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.PAYPAL_API;
const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_CLIENT_SECRET;
console.log('PayPal API Base:', process.env.PAYPAL_API);
async function generateAccessToken() {
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const res = await axios.post(`${baseURL}/v1/oauth2/token`, 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return res.data.access_token;
}

async function createOrder(total) {
  const token = await generateAccessToken();
  const res = await axios.post(`${baseURL}/v2/checkout/orders`, {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toFixed(2),
      },
    }],
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

async function captureOrder(orderId) {
  const token = await generateAccessToken();
  const res = await axios.post(`${baseURL}/v2/checkout/orders/${orderId}/capture`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

module.exports = { createOrder, captureOrder };
