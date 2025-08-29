import { useState, useEffect } from 'react';
import { db } from '../lib/db';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  return { users, loading };
}

export function useUserBadges(userId) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      db.getUserBadges(userId).then(setBadges).finally(() => setLoading(false));
    }
  }, [userId]);

  return { badges, loading };
}

export function useProgress(userId) {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      db.getProgress(userId).then(setProgress).finally(() => setLoading(false));
    }
  }, [userId]);

  const updateProgress = async (subject, topic, score, maxScore) => {
    const result = await db.updateProgress(userId, subject, topic, score, maxScore);
    setProgress(prev => [...prev.filter(p => !(p.subject === subject && p.topic === topic)), result[0]]);
  };

  return { progress, loading, updateProgress };
}