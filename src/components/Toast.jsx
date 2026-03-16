import { motion, AnimatePresence } from 'framer-motion';

const toastVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export function Toast({ id, message, type = 'success', onRemove }) {
  return (
    <motion.div
      key={id}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={toastVariants}
      className={`px-4 py-3 rounded-xl border flex items-center gap-3 text-sm shadow-2xl max-w-sm ${
        type === 'success' 
          ? 'bg-green-500/20 border-green-500/50 backdrop-blur-sm' 
          : type === 'error' 
            ? 'bg-red-500/20 border-red-500/50 backdrop-blur-sm'
            : 'bg-accent/20 border-accent/50 backdrop-blur-sm'
      }`}
    >
      <div className={`w-2 h-2 rounded-full ${
        type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : 'bg-accent'
      }`} />
      <span className="flex-1 font-medium">{message}</span>
      <button 
        onClick={onRemove}
        className="p-1 -m-1 hover:bg-white/20 rounded-full transition-all text-white/80 hover:text-white"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

