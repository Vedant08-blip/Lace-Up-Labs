import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    sneaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sneaker',
      required: true,
    },
    size: {
      type: Number,
      min: 1,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.addItem = function addItem({ sneakerId, size, quantity = 1, notes }) {
  const existing = this.items.find(
    (item) => item.sneaker.toString() === sneakerId.toString() && item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
    if (notes) {
      existing.notes = notes;
    }
    return false;
  }

  this.items.push({
    sneaker: sneakerId,
    size,
    quantity,
    notes: notes || '',
  });

  return true;
};

cartSchema.methods.updateQuantity = function updateQuantity({ sneakerId, size, quantity }) {
  const existing = this.items.find(
    (item) => item.sneaker.toString() === sneakerId.toString() && item.size === size
  );

  if (!existing) return false;

  existing.quantity = Math.max(1, quantity);
  return true;
};

cartSchema.methods.removeItem = function removeItem({ sneakerId, size }) {
  const originalLength = this.items.length;
  this.items = this.items.filter(
    (item) => item.sneaker.toString() !== sneakerId.toString() || item.size !== size
  );
  return this.items.length !== originalLength;
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
