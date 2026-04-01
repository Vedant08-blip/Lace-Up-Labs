import Cart from '../models/Cart.js';

const resolveUserId = (req) => req.user?.id || req.user?._id || req.body?.userId;

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.sneaker');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate('items.sneaker');
  }
  return cart;
};

export const getCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const cart = await getOrCreateCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart.' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const { sneakerId, size, quantity = 1, notes } = req.body;
    if (!sneakerId) {
      res.status(400).json({ message: 'sneakerId is required.' });
      return;
    }

    const cart = await getOrCreateCart(userId);
    cart.addItem({ sneakerId, size, quantity, notes });
    await cart.save();

    const populated = await cart.populate('items.sneaker');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add to cart.' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const { sneakerId, size, quantity } = req.body;
    if (!sneakerId || typeof quantity !== 'number') {
      res.status(400).json({ message: 'sneakerId and quantity are required.' });
      return;
    }

    const cart = await getOrCreateCart(userId);
    const updated = cart.updateQuantity({ sneakerId, size, quantity });
    if (!updated) {
      res.status(404).json({ message: 'Cart item not found.' });
      return;
    }

    await cart.save();
    const populated = await cart.populate('items.sneaker');
    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update cart item.' });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const { sneakerId, size } = req.body;
    if (!sneakerId) {
      res.status(400).json({ message: 'sneakerId is required.' });
      return;
    }

    const cart = await getOrCreateCart(userId);
    const removed = cart.removeItem({ sneakerId, size });
    if (!removed) {
      res.status(404).json({ message: 'Cart item not found.' });
      return;
    }

    await cart.save();
    const populated = await cart.populate('items.sneaker');
    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to remove cart item.' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }

    const cart = await getOrCreateCart(userId);
    cart.items = [];
    await cart.save();

    const populated = await cart.populate('items.sneaker');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart.' });
  }
};
