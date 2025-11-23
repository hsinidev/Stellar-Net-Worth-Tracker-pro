
import { useState, useEffect, useCallback } from 'react';
import { firestore, auth } from '../services/firebase';
import type { DataItem } from '../types';

export const useFirestore = (collectionName: 'assets' | 'liabilities') => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;

  const fetchData = useCallback(async () => {
    if (!userId) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const collectionRef = firestore.collection(userId, collectionName);
      const result = await collectionRef.getDocs();
      setData(result);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch ${collectionName}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (item: Omit<DataItem, 'id'>) => {
    if (!userId) return;
    try {
      const collectionRef = firestore.collection(userId, collectionName);
      await collectionRef.addDoc(item);
      fetchData(); // Refetch data after adding
    } catch (err) {
      setError(`Failed to add item to ${collectionName}.`);
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!userId) return;
    try {
      const collectionRef = firestore.collection(userId, collectionName);
      await collectionRef.deleteDoc(id);
      fetchData(); // Refetch data after deleting
    } catch (err) {
      setError(`Failed to delete item from ${collectionName}.`);
      console.error(err);
    }
  };

  return { data, loading, error, addItem, deleteItem };
};
