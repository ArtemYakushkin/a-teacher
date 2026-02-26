import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';
import { useAuthModal } from '../../firebase/AuthModalContext';

const RegisterForm = ({ activeView, onToggle }) => {
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { setIsOpen } = useAuthModal();
	const navigate = useNavigate();

	// 📌 Регистрация Email + Password
	const handleRegister = async () => {
		try {
			setLoading(true);
			setError('');

			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			// никнейм в auth
			await updateProfile(res.user, {
				displayName: nickname,
			});

			// пользователь в Firestore
			await setDoc(doc(db, 'users', res.user.uid), {
				nickname,
				email,
				hasCourseABC: false,
				createdAt: new Date(),
			});

			setIsOpen(false);
			navigate('/courses');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// 📌 Регистрация через Google
	const handleGoogleRegister = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);

			const ref = doc(db, 'users', res.user.uid);
			const snap = await getDoc(ref);

			if (!snap.exists()) {
				await setDoc(ref, {
					nickname: res.user.displayName,
					email: res.user.email,
					hasCourseABC: false,
					createdAt: new Date(),
				});
			}

			setIsOpen(false);
			navigate('/courses');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div
			className={`form register ${activeView === 'register' ? 'active' : ''}`}
		>
			<h2>Реєстрація</h2>

			<form>
				<input
					placeholder="Ім'я"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<input
					placeholder="Ел.пошта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{error && <p style={{ color: 'red' }}>{error}</p>}

				<button onClick={handleRegister} disabled={loading}>
					Зареєструватись
				</button>
			</form>

			<span>або</span>

			<button className="google" onClick={handleGoogleRegister}>
				Ввійти через Google
			</button>

			<p className="link" onClick={onToggle}>
				Авторизуватися
			</p>
		</div>
	);
};

export default RegisterForm;
