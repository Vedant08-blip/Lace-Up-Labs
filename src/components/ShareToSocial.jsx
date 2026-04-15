import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function ShareToSocial({ sneaker, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!sneaker) return null;

  const shareUrl = `${window.location.origin}?sneaker=${sneaker.id}`;
  const shareText = `Check out this 🔥 sneaker: ${sneaker.name} by ${sneaker.brand} - Only ₹${sneaker.price.toLocaleString()} on Lace Up Labs!`;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-400',
      bg: 'hover:bg-blue-500/10',
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-pink-400',
      bg: 'hover:bg-pink-500/10',
      note: '(Copy link and share in story)',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'hover:text-green-400',
      bg: 'hover:bg-green-500/10',
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600',
      bg: 'hover:bg-blue-600/10',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-card overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(255,59,48,0.15)',
              }}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg tracking-[0.16em] uppercase">
                    Share Sneaker
                  </h2>
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

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Sneaker Preview */}
                <div className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800">
                  <img
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1">
                      {sneaker.brand}
                    </p>
                    <p className="text-sm font-semibold text-white line-clamp-2">
                      {sneaker.name}
                    </p>
                    <p className="text-accent font-bold mt-1">₹{sneaker.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Share on Social Media
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {shareLinks.map((link) => (
                      <motion.button
                        key={link.name}
                        onClick={() => handleShare(link.url)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-800 transition-all duration-300 ${link.bg}`}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.1em]">
                          {link.name}
                        </span>
                        {link.note && (
                          <span className="text-[0.6rem] text-zinc-500 text-center">{link.note}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Copy Link Section */}
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Or Copy Link
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-4 py-2.5 rounded-lg bg-black/40 border border-zinc-800 text-xs text-zinc-400 font-mono truncate"
                    />
                    <motion.button
                      onClick={handleCopyLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 rounded-lg font-semibold uppercase tracking-[0.16em] text-xs transition-all duration-300 ${
                        copied
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : 'bg-accent hover:brightness-110 text-black border border-accent'
                      }`}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </motion.button>
                  </div>
                </div>

                {/* Share Count */}
                <div className="pt-2 text-center">
                  <p className="text-[0.65rem] text-zinc-600">
                    Spread the drip! 🔥 Share this heat with your crew
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ShareToSocial;
