import express from 'express';
import {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getUserOrders);
router.put('/status', protect, isAdmin, updateOrderStatus);
router.delete('/:id', protect, cancelOrder); // ✅ Keep this simple and match frontend

export default router;
