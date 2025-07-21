import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'preparing', 'out for delivery', 'delivered'],
    default: 'placed',
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
