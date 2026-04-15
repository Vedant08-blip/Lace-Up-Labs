import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCheckout } from '../context/CheckoutContext';

const ORDER_STATUSES = {
  placed: { label: 'Order Placed', icon: '✓', color: 'text-green-400', bgColor: 'bg-green-500/20' },
  processing: { label: 'Processing', icon: '⚙️', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  shipped: { label: 'Shipped', icon: '📦', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  intransit: { label: 'In Transit', icon: '🚚', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  delivered: { label: 'Delivered', icon: '🏠', color: 'text-green-400', bgColor: 'bg-green-500/20' },
};

// Mock order data
const mockOrders = [
  {
    id: 'LU-1713289321',
    date: 'April 16, 2026',
    total: 8999,
    status: 'delivered',
    items: [
      { name: 'Air Jordan 1 Retro High', brand: 'Nike', size: '10', price: 8999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150' },
    ],
    timeline: [
      { status: 'placed', date: 'Apr 16, 10:30 AM', location: 'Order Confirmed' },
      { status: 'processing', date: 'Apr 16, 2:15 PM', location: 'Order Processing' },
      { status: 'shipped', date: 'Apr 17, 9:00 AM', location: 'Shipped from Mumbai' },
      { status: 'intransit', date: 'Apr 18, 3:45 PM', location: 'In Transit to Surat' },
      { status: 'delivered', date: 'Apr 19, 5:20 PM', location: 'Delivered' },
    ],
    tracking: 'FX9876543210',
  },
  {
    id: 'LU-1713202921',
    date: 'April 15, 2026',
    total: 12999,
    status: 'intransit',
    items: [
      { name: 'Adidas Ultraboost 22', brand: 'Adidas', size: '9', price: 12999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150' },
    ],
    timeline: [
      { status: 'placed', date: 'Apr 15, 11:20 AM', location: 'Order Confirmed' },
      { status: 'processing', date: 'Apr 15, 1:50 PM', location: 'Order Processing' },
      { status: 'shipped', date: 'Apr 16, 8:30 AM', location: 'Shipped from Delhi' },
      { status: 'intransit', date: 'Apr 17, 4:15 PM', location: 'In Transit to Surat' },
    ],
    tracking: 'FX9876543211',
  },
];

function OrderCard({ order, onClick }) {
  const statusInfo = ORDER_STATUSES[order.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="p-4 rounded-xl border border-zinc-800 bg-black/30 hover:border-zinc-700 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Order ID: {order.id}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
            {order.items[0].name}
          </p>
          <p className="text-xs text-zinc-500">{order.date}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-accent">₹{order.total.toLocaleString()}</p>
          <p className="text-xs text-zinc-500">1 item</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-600">
        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: order.status === 'placed' ? '20%' : order.status === 'processing' ? '40%' : order.status === 'shipped' ? '60%' : order.status === 'intransit' ? '80%' : '100%',
            }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-full bg-linear-to-r from-accent to-orange-600"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function OrderTracking({ isOpen, onClose }) {
  const { orders } = useCheckout();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedTimeline, setExpandedTimeline] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-zinc-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-zinc-800 bg-background/95 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl tracking-[0.16em] uppercase">
                  {selectedOrder ? 'Order Details' : 'My Orders'}
                </h2>
                <div className="flex items-center gap-2">
                  {selectedOrder && (
                    <motion.button
                      onClick={() => setSelectedOrder(null)}
                      whileHover={{ x: -4 }}
                      className="flex items-center gap-2 text-accent text-sm px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {selectedOrder ? (
                // Order Details
                <div className="p-6 space-y-6">
                  {/* Order Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1">Order ID</p>
                        <p className="font-mono text-sm font-semibold text-white">{selectedOrder.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1">Order Date</p>
                        <p className="text-sm font-semibold text-white">{selectedOrder.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl ${ORDER_STATUSES[selectedOrder.status].bgColor} border border-zinc-800`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ORDER_STATUSES[selectedOrder.status].icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${ORDER_STATUSES[selectedOrder.status].color}`}>
                          {ORDER_STATUSES[selectedOrder.status].label}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {selectedOrder.status === 'delivered'
                            ? 'Your order has been delivered'
                            : selectedOrder.status === 'intransit'
                            ? 'Your order is on the way'
                            : selectedOrder.status === 'shipped'
                            ? 'Your order has been shipped'
                            : selectedOrder.status === 'processing'
                            ? 'We\'re preparing your order'
                            : 'Your order has been confirmed'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tracking Number */}
                  <div className="p-4 rounded-xl bg-black/50 border border-zinc-800">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Tracking Number</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-semibold text-white">{selectedOrder.tracking}</p>
                      <motion.button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedOrder.tracking);
                          window.addToast?.('Tracking number copied!', 'success');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-accent text-black rounded-lg font-semibold hover:brightness-110 transition-all"
                      >
                        Copy
                      </motion.button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">Items</p>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 rounded-lg bg-black/50 border border-zinc-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1">{item.brand}</p>
                          <p className="text-sm font-semibold text-white line-clamp-2">{item.name}</p>
                          <p className="text-xs text-zinc-500 mt-1">Size: {item.size}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-accent font-semibold">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">Delivery Timeline</p>
                    <div className="relative space-y-4">
                      {selectedOrder.timeline.map((event, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-6 top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                            style={{
                              borderColor: ORDER_STATUSES[event.status].color.includes('green-400') ? '#4ade80' : ORDER_STATUSES[event.status].color.includes('blue-400') ? '#60a5fa' : ORDER_STATUSES[event.status].color.includes('yellow-400') ? '#facc15' : '#a78bfa',
                              backgroundColor: ORDER_STATUSES[event.status].color.includes('green-400') ? '#22c55e' : ORDER_STATUSES[event.status].color.includes('blue-400') ? '#3b82f6' : ORDER_STATUSES[event.status].color.includes('yellow-400') ? '#eab308' : '#a855f7',
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-background" />
                          </div>

                          {/* Timeline line */}
                          {idx < selectedOrder.timeline.length - 1 && (
                            <div className="absolute -left-3 top-6 w-0.5 h-12 bg-linear-to-b from-zinc-700 to-zinc-900" />
                          )}

                          {/* Content */}
                          <motion.div
                            whileHover={{ x: 4 }}
                            onClick={() => setExpandedTimeline(expandedTimeline === idx ? null : idx)}
                            className="ml-4 p-3 rounded-lg bg-black/50 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-semibold text-white">{event.location}</p>
                                <p className="text-xs text-zinc-500 mt-1">{event.date}</p>
                              </div>
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${ORDER_STATUSES[event.status].bgColor} ${ORDER_STATUSES[event.status].color}`}>
                                {ORDER_STATUSES[event.status].label}
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">Order Summary</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Subtotal:</span>
                      <span className="text-white">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Shipping:</span>
                      <span className="text-white">FREE</span>
                    </div>
                    <div className="h-px bg-zinc-800 my-2" />
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-white">Total:</span>
                      <span className="text-accent">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary"
                    >
                      Need Help?
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Leave Review
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Orders List
                <div className="p-6 space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onClick={() => setSelectedOrder(order)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📦</div>
                      <p className="text-zinc-400 mb-2">No orders yet</p>
                      <p className="text-xs text-zinc-600">Start shopping to see your orders here!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default OrderTracking;
