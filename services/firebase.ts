
// This is a mock Firebase setup to simulate Firestore functionality without a real backend.
// In a real application, you would use the actual Firebase SDK.
import type { DataItem } from '../types';

const MOCK_DB: { [key: string]: { [key: string]: DataItem[] } } = {
  'user_anonymous_123': {
    'assets': [
      { id: 'a1', name: 'Checking Account', value: 5000 },
      { id: 'a2', name: 'Stock Portfolio', value: 25000 },
      { id: 'a3', name: 'Real Estate (Home)', value: 350000 },
    ],
    'liabilities': [
      { id: 'l1', name: 'Mortgage', value: 280000 },
      { id: 'l2', name: 'Credit Card Debt', value: 3500 },
      { id: 'l3', name: 'Car Loan', value: 12000 },
    ]
  }
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Mock Firestore API
export const firestore = {
  collection: (userId: string, collectionName: string) => ({
    getDocs: async (): Promise<DataItem[]> => {
      await delay(500);
      if (MOCK_DB[userId] && MOCK_DB[userId][collectionName]) {
        return [...MOCK_DB[userId][collectionName]];
      }
      return [];
    },
    addDoc: async (data: Omit<DataItem, 'id'>): Promise<DataItem> => {
      await delay(300);
      const newId = `${collectionName.slice(0, 1)}${Date.now()}`;
      const newItem: DataItem = { id: newId, ...data };
      
      if (!MOCK_DB[userId]) {
        MOCK_DB[userId] = { assets: [], liabilities: [] };
      }
      MOCK_DB[userId][collectionName].push(newItem);
      return newItem;
    },
    deleteDoc: async (id: string): Promise<void> => {
      await delay(300);
      if (MOCK_DB[userId] && MOCK_DB[userId][collectionName]) {
        MOCK_DB[userId][collectionName] = MOCK_DB[userId][collectionName].filter(item => item.id !== id);
      }
    },
  }),
};

// Mock Firebase Auth
export const auth = {
  currentUser: {
    uid: 'user_anonymous_123' // Simulated user ID
  }
};
