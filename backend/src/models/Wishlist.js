import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema(
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
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [wishlistItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.methods.addItem = function addItem({ sneakerId, size, notes }) {
  const alreadyExists = this.items.some(
    (item) => item.sneaker.toString() === sneakerId.toString() && item.size === size
  );

  if (alreadyExists) {
    return false;
  }

  this.items.push({
    sneaker: sneakerId,
    size,
    notes: notes || '',
  });

  return true;
};

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
