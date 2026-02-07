import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBudwaYrxjiqCFoyvrjal-IjOsxCHLWmGc',
	authDomain: 'a-teacher-3c6f1.firebaseapp.com',
	projectId: 'a-teacher-3c6f1',
	storageBucket: 'a-teacher-3c6f1.firebasestorage.app',
	messagingSenderId: '962632256622',
	appId: '1:962632256622:web:47066c15fb7e695b53ea7f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
