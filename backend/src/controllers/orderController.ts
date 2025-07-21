import { Request, Response } from 'express';
import Order from '../models/Order';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const newOrder = await Order.create({
      items,
      userId: req.user?.id,
    });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user?.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    res.status(200).json({ message: 'Status updated', order: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // @ts-ignore – user is attached by protect middleware
    if (order.userId.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const now = new Date();
    const createdAt = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - createdAt.getTime()) / 60000;

    if (diffMinutes > 5) {
      return res.status(400).json({ message: 'Cannot cancel after 5 minutes' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Cancel failed', error: err.message });
  }
};