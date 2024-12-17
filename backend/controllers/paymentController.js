import Razorpay from 'razorpay';
import Order from '../models/orderModel.js';
import nodemailer from 'nodemailer';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Verify payment signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Update order status
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          razorpay_payment_id,
          razorpay_order_id,
          status: 'completed',
        };

        const updatedOrder = await order.save();

        // Send confirmation email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: req.user.email,
          subject: 'Order Payment Confirmation',
          text: `Your payment for order ${orderId} has been confirmed. Payment ID: ${razorpay_payment_id}`,
        };

        await transporter.sendMail(mailOptions);

        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order) {
      res.json({
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        paymentResult: order.paymentResult,
      });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment status' });
  }
};