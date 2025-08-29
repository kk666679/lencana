import { useState, useEffect } from 'react';
import { badges } from '../data/badges';

export function useBadges(filters = {}) {
  const [filteredBadges, setFilteredBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    let result = badges;
    
    if (filters.category && filters.category !== 'All') {
      result = result.filter(badge => badge.category === filters.category);
    }
    
    if (filters.rarity && filters.rarity !== 'All') {
      result = result.filter(badge => badge.rarity === filters.rarity);
    }
    
    setFilteredBadges(result);
    setLoading(false);
  }, [JSON.stringify(filters)]);

  return { badges: filteredBadges, loading };
}