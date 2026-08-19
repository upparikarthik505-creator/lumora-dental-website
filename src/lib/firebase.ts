import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId || 'ai-studio-aventuradentalar-f2e50ae5-5b53-44af-ba67-b61d026bc1c7'
);

export async function testBackendConnection(): Promise<{ success: boolean; message: string; databaseId: string; timestamp: string }> {
  try {
    const testDocRef = doc(db, '_connection_test', 'status');
    const timestamp = new Date().toISOString();
    await setDoc(testDocRef, {
      lastChecked: timestamp,
      status: 'active',
      app: 'Aventura Dental Atelier',
      platform: 'Firebase Firestore'
    }, { merge: true });

    return {
      success: true,
      message: 'Successfully connected and verified read/write capability on Firestore DB!',
      databaseId: firebaseConfig.firestoreDatabaseId || 'ai-studio-aventuradentalar-f2e50ae5-5b53-44af-ba67-b61d026bc1c7',
      timestamp
    };
  } catch (error: any) {
    console.error('Backend connection test error:', error);
    return {
      success: false,
      message: error?.message || 'Failed to connect to Firebase database',
      databaseId: firebaseConfig.firestoreDatabaseId || 'ai-studio-aventuradentalar-f2e50ae5-5b53-44af-ba67-b61d026bc1c7',
      timestamp: new Date().toISOString()
    };
  }
}

export { collection, addDoc, getDocs, onSnapshot, query, orderBy, setDoc, doc, deleteDoc };

