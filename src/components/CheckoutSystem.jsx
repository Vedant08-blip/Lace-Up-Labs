import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Delivery', price: 0, days: '5-7 days', icon: '📦' },
  { id: 'express', name: 'Express Delivery', price: 150, days: '2-3 days', icon: '⚡' },
  { id: 'overnight', name: 'Overnight', price: 499, days: '1 day', icon: '🚀' },
];

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'wallet', name: 'Digital Wallet', icon: '👛' },
];

function CheckoutStep({ step, currentStep, title, number, children }) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <motion.div
      className={`border rounded-xl transition-all duration-300 ${
        isActive
          ? 'border-accent bg-accent/5'
          : isCompleted
          ? 'border-green-500/50 bg-green-500/5'
          : 'border-zinc-800 bg-black/30'
      }`}
    >
      <div
        className={`p-4 flex items-center gap-3 cursor-pointer ${isActive ? '' : 'hover:bg-white/5'}`}
      >
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
            isCompleted
              ? 'bg-green-500/20 text-green-400'
              : isActive
              ? 'bg-accent text-black'
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          {isCompleted ? '✓' : number}
        </div>
        <span className="font-semibold text-white">{title}</span>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-zinc-800 p-6 space-y-4"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

export function CheckoutSystem({ isOpen, onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingOption, setShippingOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const shippingCost = SHIPPING_OPTIONS.find((opt) => opt.id === shippingOption)?.price || 0;
  const couponDiscount = appliedCoupon?.discount || 0;
  const finalTotal = cartTotal + shippingCost - couponDiscount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const coupons = {
      'LACE50': { discount: 500, label: '50₹ off' },
      'SUMMER20': { discount: 2000, label: '20% off' },
      'FIRST100': { discount: 1000, label: '100₹ off' },
    };

    if (coupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: coupons[couponCode.toUpperCase()].discount,
      });
      window.addToast?.(`Coupon "${couponCode}" applied!`, 'success');
      setCouponCode('');
    } else {
      window.addToast?.('Invalid coupon code', 'error');
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const newOrderId = `LU-${Date.now()}`;
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
      setIsProcessing(false);
      window.addToast?.('Order placed successfully!', 'success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isProcessing && onClose()}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-zinc-800 bg-background flex flex-col"
              style={{
                boxShadow: '0 20px 60px rgba(255,59,48,0.2)',
              }}
            >
              {/* Header */}
              <div className="sticky top-0 border-b border-zinc-800 bg-background/95 backdrop-blur-sm p-6 flex items-center justify-between">
                <h1 className="font-heading text-2xl tracking-[0.16em] uppercase">
                  {orderPlaced ? 'Order Confirmed' : 'Checkout'}
                </h1>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isProcessing}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {orderPlaced ? (
                  // Order Confirmation
                  <div className="p-8 space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="flex justify-center"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold text-white">Thank You for Your Order!</h2>
                      <p className="text-accent font-mono text-lg">Order ID: {orderId}</p>
                      <p className="text-zinc-400">We're getting your kicks ready to ship!</p>
                    </div>

                    <div className="bg-black/50 rounded-xl p-6 space-y-4 border border-zinc-800">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Order Summary</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Subtotal:</span>
                          <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Shipping:</span>
                          <span className="text-white">₹{shippingCost}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Discount:</span>
                            <span className="text-green-400">-₹{appliedCoupon.discount}</span>
                          </div>
                        )}
                        <div className="h-px bg-zinc-800 my-2" />
                        <div className="flex justify-between text-base font-semibold">
                          <span className="text-white">Total:</span>
                          <span className="text-accent">₹{finalTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Shipping To</p>
                        <p className="text-sm text-white">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-sm text-zinc-400">
                          {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-sm text-zinc-400">{formData.phone}</p>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-sm text-blue-300">
                        📧 A confirmation email has been sent to <strong>{formData.email}</strong>
                      </p>
                    </div>

                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full py-3"
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                ) : (
                  // Checkout Steps
                  <div className="p-6 space-y-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Steps */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Step 1: Shipping Address */}
                      <CheckoutStep
                        step={0}
                        currentStep={currentStep}
                        title="Shipping Address"
                        number="1"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input-field col-span-2"
                          />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="input-field col-span-2"
                          />
                          <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="input-field col-span-2"
                          />
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                          <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                          <input
                            type="text"
                            name="zipCode"
                            placeholder="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                        </div>
                        <motion.button
                          onClick={() => setCurrentStep(1)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary w-full mt-4"
                        >
                          Continue to Shipping
                        </motion.button>
                      </CheckoutStep>

                      {/* Step 2: Shipping Method */}
                      <CheckoutStep
                        step={1}
                        currentStep={currentStep}
                        title="Shipping Method"
                        number="2"
                      >
                        <div className="space-y-3">
                          {SHIPPING_OPTIONS.map((option) => (
                            <motion.label
                              key={option.id}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                              style={{
                                borderColor:
                                  shippingOption === option.id
                                    ? '#FF3B30'
                                    : 'rgba(113,113,122,0.3)',
                                background:
                                  shippingOption === option.id
                                    ? 'rgba(255,59,48,0.05)'
                                    : 'rgba(0,0,0,0.2)',
                              }}
                            >
                              <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={shippingOption === option.id}
                                onChange={(e) => setShippingOption(e.target.value)}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{option.icon}</span>
                                  <div>
                                    <p className="font-semibold text-white text-sm">{option.name}</p>
                                    <p className="text-xs text-zinc-500">{option.days}</p>
                                  </div>
                                </div>
                              </div>
                              <span className="font-semibold text-white">
                                {option.price === 0 ? 'FREE' : `₹${option.price}`}
                              </span>
                            </motion.label>
                          ))}
                        </div>
                        <motion.button
                          onClick={() => setCurrentStep(2)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary w-full mt-4"
                        >
                          Continue to Payment
                        </motion.button>
                      </CheckoutStep>

                      {/* Step 3: Payment */}
                      <CheckoutStep
                        step={2}
                        currentStep={currentStep}
                        title="Payment Method"
                        number="3"
                      >
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            {PAYMENT_METHODS.map((method) => (
                              <motion.label
                                key={method.id}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all"
                                style={{
                                  borderColor:
                                    paymentMethod === method.id
                                      ? '#FF3B30'
                                      : 'rgba(113,113,122,0.3)',
                                  background:
                                    paymentMethod === method.id
                                      ? 'rgba(255,59,48,0.05)'
                                      : 'rgba(0,0,0,0.2)',
                                }}
                              >
                                <input
                                  type="radio"
                                  name="payment"
                                  value={method.id}
                                  checked={paymentMethod === method.id}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="w-4 h-4"
                                />
                                <span className="text-lg">{method.icon}</span>
                                <span className="text-sm font-semibold text-white flex-1">{method.name}</span>
                              </motion.label>
                            ))}
                          </div>

                          {paymentMethod === 'card' && (
                            <div className="space-y-3 mt-4 p-4 bg-black/50 rounded-lg border border-zinc-800">
                              <input
                                type="text"
                                placeholder="Card Number"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                                }
                                className="input-field"
                                maxLength="19"
                              />
                              <input
                                type="text"
                                placeholder="Cardholder Name"
                                value={cardDetails.cardHolder}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, cardHolder: e.target.value })
                                }
                                className="input-field"
                              />
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={cardDetails.expiry}
                                  onChange={(e) =>
                                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                                  }
                                  className="input-field"
                                  maxLength="5"
                                />
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  value={cardDetails.cvv}
                                  onChange={(e) =>
                                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                                  }
                                  className="input-field"
                                  maxLength="4"
                                />
                              </div>
                            </div>
                          )}

                          <motion.button
                            onClick={handlePlaceOrder}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isProcessing}
                            className="btn-primary w-full mt-4 disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Processing...
                              </div>
                            ) : (
                              `Pay ₹${finalTotal.toLocaleString()}`
                            )}
                          </motion.button>
                        </div>
                      </CheckoutStep>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky top-24 p-4 rounded-xl border border-zinc-800 bg-black/50 space-y-4"
                      >
                        <h3 className="font-semibold text-white">Order Summary</h3>

                        {/* Items */}
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                              <span className="text-zinc-400 line-clamp-1">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-white font-semibold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="h-px bg-zinc-800" />

                        {/* Coupon */}
                        {currentStep >= 1 && (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="input-field flex-1 text-xs"
                                disabled={!!appliedCoupon}
                              />
                              <motion.button
                                onClick={handleApplyCoupon}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!!appliedCoupon}
                                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 text-white"
                              >
                                Apply
                              </motion.button>
                            </div>
                            {appliedCoupon && (
                              <div className="flex items-center justify-between text-sm bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                                <span className="text-green-400">{appliedCoupon.code}</span>
                                <button
                                  onClick={() => setAppliedCoupon(null)}
                                  className="text-green-500 hover:text-green-400 text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="h-px bg-zinc-800" />

                        {/* Totals */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-zinc-400">
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>Shipping</span>
                            <span>₹{shippingCost}</span>
                          </div>
                          {appliedCoupon && (
                            <div className="flex justify-between text-green-400">
                              <span>Discount</span>
                              <span>-₹{appliedCoupon.discount}</span>
                            </div>
                          )}
                          <div className="h-px bg-zinc-800" />
                          <div className="flex justify-between font-semibold text-white">
                            <span>Total</span>
                            <span className="text-accent">₹{finalTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CheckoutSystem;
