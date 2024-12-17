import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  generateOrderQR,
  initiateReturn,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus);

router.route('/:id/qr').get(protect, generateOrderQR);
router.route('/:id/return').post(protect, initiateReturn);

export default router;