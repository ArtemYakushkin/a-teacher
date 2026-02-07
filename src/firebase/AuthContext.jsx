import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		return onAuthStateChanged(auth, async (u) => {
			setUser(u);
			if (u) {
				const snap = await getDoc(doc(db, 'users', u.uid));
				setUserData(snap.data());
			}
		});
	}, []);

	const logout = async () => {
		await signOut(auth);
		setUser(null);
		setUserData(null);
	};

	return (
		<AuthContext.Provider value={{ user, userData, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
