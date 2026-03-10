import { useState, useMemo } from 'react';
import { SNEAKERS } from '../data/sneakers';

export function useAIRecommendation() {
  const [budget, setBudget] = useState('');
  const [style, setStyle] = useState('');
  const [activity, setActivity] = useState('');
  const [recommended, setRecommended] = useState(null);

  const handleRecommend = () => {
    const maxBudget = budget ? Number(budget) : Infinity;
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

    if (pool.length === 0) pool = SNEAKERS;
    const pick = pool.sort((a, b) => b.rating - a.rating)[0];
    setRecommended(pick);
    return pick;
  };

  const reset = () => {
    setBudget('');
    setStyle('');
    setActivity('');
    setRecommended(null);
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

