import { useState } from 'react';
import { SNEAKERS } from '../data/sneakers';

export function useAIRecommendation() {
  const [budget, setBudget] = useState('');
  const [style, setStyle] = useState('');
  const [activity, setActivity] = useState('');
  const [recommended, setRecommended] = useState([]);

  const handleRecommend = () => {
    if (!budget || !activity) {
      return [];
    }

    const maxBudget = Number(budget);
    let pool = SNEAKERS.filter((s) => s.price <= maxBudget);

    if (activity) {
      pool = pool.filter(
        (s) => s.category.toLowerCase() === activity.toLowerCase(),
      );
    }

    if (style) {
      pool = pool.filter((s) =>
        s.tags.some((t) => t.toLowerCase().includes(style.toLowerCase())),
      );
    }

    if (pool.length === 0) {
      pool = SNEAKERS.filter((s) => s.price <= maxBudget);
    }

    const ordered = [...pool].sort((a, b) => b.rating - a.rating);
    let picks = ordered.slice(0, 3);

    if (picks.length < 3) {
      const fallback = [...SNEAKERS]
        .filter((s) => !picks.some((p) => p.id === s.id))
        .sort((a, b) => b.rating - a.rating);
      picks = [...picks, ...fallback.slice(0, 3 - picks.length)];
    }

    setRecommended(picks);
    return picks;
  };

  const reset = () => {
    setBudget('');
    setStyle('');
    setActivity('');
    setRecommended([]);
  };

  return {
    budget,
    setBudget,
    style,
    setStyle,
    activity,
    setActivity,
    recommended,
    handleRecommend,
    reset,
  };
}

export default useAIRecommendation;
