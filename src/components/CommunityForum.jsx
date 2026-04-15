import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const mockThreads = [
  {
    id: 1,
    title: 'Best Jordan 1 Retros for beginners?',
    author: 'SneakerHead_101',
    category: 'Collections',
    replies: 24,
    views: 342,
    lastReply: '2h ago',
    excerpt: 'Just getting into Jordan 1s, what are the most iconic ones to start with?',
    badge: 'hot',
  },
  {
    id: 2,
    title: 'New Nike Drop - React Series',
    author: 'TechSneakerGuru',
    category: 'Drops',
    replies: 18,
    views: 289,
    lastReply: '4h ago',
    excerpt: 'Just dropped this morning! React cushioning is insane. Early impressions?',
    badge: 'new',
  },
  {
    id: 3,
    title: 'Legit check: Adidas Ultraboost',
    author: 'CollectorPro',
    category: 'Legit Check',
    replies: 12,
    views: 156,
    lastReply: '1h ago',
    excerpt: 'Can someone help me verify if these are authentic?',
    badge: null,
  },
  {
    id: 4,
    title: 'Styling Tips: How to Wear Chunky Sneakers',
    author: 'StyleIcon',
    category: 'Styling',
    replies: 31,
    views: 521,
    lastReply: '30m ago',
    excerpt: 'Share your best outfits with chunky sneakers! I need inspo for my collection.',
    badge: 'trending',
  },
];

function ThreadCard({ thread, onClick }) {
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'hot':
        return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' };
      case 'new':
        return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' };
      case 'trending':
        return { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' };
      default:
        return { bg: 'bg-zinc-800/40', border: 'border-zinc-700', text: 'text-zinc-400' };
    }
  };

  const badgeColor = getBadgeColor(thread.badge);
  const categoryColors = {
    'Collections': 'text-blue-400',
    'Drops': 'text-red-400',
    'Legit Check': 'text-yellow-400',
    'Styling': 'text-pink-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="p-4 rounded-xl border border-zinc-800 bg-black/30 cursor-pointer hover:border-zinc-700 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[0.6rem] uppercase tracking-[0.2em] font-semibold ${categoryColors[thread.category]}`}>
              {thread.category}
            </span>
            {thread.badge && (
              <span className={`text-[0.55rem] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${badgeColor.bg} ${badgeColor.border} ${badgeColor.text}`}>
                {thread.badge}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
            {thread.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-zinc-400 mb-3 line-clamp-1">{thread.excerpt}</p>

      <div className="flex items-center justify-between text-[0.65rem] text-zinc-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            {thread.replies}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            {thread.views}
          </span>
        </div>
        <span className="text-zinc-600">{thread.lastReply}</span>
      </div>
    </motion.div>
  );
}

export function CommunityForum({ isOpen, onClose }) {
  const { user, openAuthModal } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  const categories = ['All', 'Collections', 'Drops', 'Legit Check', 'Styling'];

  const filteredThreads = mockThreads.filter((thread) => {
    const categoryMatch = activeCategory === 'All' || thread.category === activeCategory;
    const searchMatch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handlePostReply = useCallback(() => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (newReply.trim()) {
      const reply = {
        id: Date.now(),
        author: user.name,
        avatar: user.avatar,
        content: newReply,
        timestamp: 'now',
        likes: 0,
      };
      setReplies([...replies, reply]);
      setNewReply('');
      window.addToast?.('Reply posted!', 'success');
    }
  }, [newReply, user, replies, openAuthModal]);

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
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl tracking-[0.16em] uppercase">
                  Community Forum
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

              {/* Search */}
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full mb-4"
              />

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-xs uppercase tracking-[0.16em] font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-accent text-black'
                        : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {selectedThread ? (
                // Thread Detail View
                <div className="p-6 space-y-6">
                  {/* Thread Header */}
                  <motion.button
                    onClick={() => setSelectedThread(null)}
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-2 text-accent text-sm mb-4"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Threads
                  </motion.button>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className={`text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-blue-400`}>
                        {selectedThread.category}
                      </span>
                      {selectedThread.badge && (
                        <span className="text-[0.55rem] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400">
                          {selectedThread.badge}
                        </span>
                      )}
                    </div>
                    <h1 className="font-heading text-2xl tracking-[0.12em] uppercase text-white">
                      {selectedThread.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>By {selectedThread.author}</span>
                      <span>{selectedThread.replies} replies</span>
                      <span>{selectedThread.views} views</span>
                    </div>
                  </div>

                  {/* Original Post */}
                  <div className="p-4 rounded-xl bg-black/50 border border-zinc-800">
                    <p className="text-sm text-white">{selectedThread.excerpt}</p>
                  </div>

                  {/* Replies */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">{replies.length + 2} Replies</h3>
                    {replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-black/30 border border-zinc-800"
                      >
                        <div className="flex gap-3 mb-3">
                          <img
                            src={reply.avatar}
                            alt={reply.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{reply.author}</p>
                            <p className="text-xs text-zinc-500">{reply.timestamp}</p>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-300">{reply.content}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="space-y-3 mt-6">
                    <label className="block text-sm font-semibold text-white">
                      Add Your Reply
                    </label>
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder={user ? 'Share your thoughts...' : 'Sign in to reply...'}
                      disabled={!user}
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm resize-none focus:border-accent focus:ring-1 focus:ring-accent/60 transition-all disabled:opacity-50"
                      rows={4}
                    />
                    <motion.button
                      onClick={handlePostReply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full"
                    >
                      Post Reply
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Threads List View
                <div className="p-6 space-y-3">
                  {filteredThreads.length > 0 ? (
                    filteredThreads.map((thread) => (
                      <ThreadCard
                        key={thread.id}
                        thread={thread}
                        onClick={() => {
                          setSelectedThread(thread);
                          setReplies([]);
                        }}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-zinc-500 mb-2">No discussions found</p>
                      <p className="text-xs text-zinc-600">Try a different search or category</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {!selectedThread && (
              <div className="border-t border-zinc-800 bg-background/95 backdrop-blur-sm p-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => user ? window.location.href = '/new-thread' : openAuthModal()}
                  className="btn-primary w-full"
                >
                  + Start New Discussion
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommunityForum;
