import Sneaker from '../models/Sneaker.js';

const buildFilter = (query) => {
  const filter = {};

  if (query.brand) {
    filter.brand = query.brand;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    const pattern = query.search.trim();
    if (pattern) {
      filter.$or = [
        { name: { $regex: pattern, $options: 'i' } },
        { brand: { $regex: pattern, $options: 'i' } },
        { category: { $regex: pattern, $options: 'i' } },
        { tags: { $regex: pattern, $options: 'i' } },
      ];
    }
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return filter;
};

const buildSort = (sort) => {
  switch (sort) {
    case 'price-asc':
      return { price: 1 };
    case 'price-desc':
      return { price: -1 };
    case 'rating':
      return { rating: -1 };
    case 'newest':
      return { createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

export const getSneakers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
    const filter = buildFilter(req.query);
    const sort = buildSort(req.query.sort);

    const [items, total] = await Promise.all([
      Sneaker.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Sneaker.countDocuments(filter),
    ]);

    res.json({
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sneakers.' });
  }
};

export const getSneakerBySlug = async (req, res) => {
  try {
    const sneaker = await Sneaker.findOne({ slug: req.params.slug });

    if (!sneaker) {
      res.status(404).json({ message: 'Sneaker not found.' });
      return;
    }

    res.json(sneaker);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sneaker.' });
  }
};

export const createSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.create(req.body);
    res.status(201).json(sneaker);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create sneaker.' });
  }
};

export const updateSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!sneaker) {
      res.status(404).json({ message: 'Sneaker not found.' });
      return;
    }

    res.json(sneaker);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update sneaker.' });
  }
};

export const deleteSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.findOneAndDelete({ slug: req.params.slug });

    if (!sneaker) {
      res.status(404).json({ message: 'Sneaker not found.' });
      return;
    }

    res.json({ message: 'Sneaker deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sneaker.' });
  }
};
