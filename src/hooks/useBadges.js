import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export function useBadges(filters = {}) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getBadges(filters);
        setBadges(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [JSON.stringify(filters)]);

  return { badges, loading, error };
}

export function useBadge(id) {
  const [badge, setBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBadge = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getBadge(id);
        setBadge(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBadge();
  }, [id]);

  return { badge, loading, error };
}