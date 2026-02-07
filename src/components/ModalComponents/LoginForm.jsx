import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthModal } from '../../firebase/AuthModalContext';
import { auth, db } from '../../firebase/firebase';

const LoginForm = ({ activeView }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	const { setIsOpen } = useAuthModal();
	const navigate = useNavigate();

	// 📌 Логин email + password
	const handleLogin = async () => {
		try {
			setError('');
			await signInWithEmailAndPassword(auth, email, password);
			setIsOpen(false);
			navigate('/courses');
		} catch (err) {
			setError('Невірний email або пароль');
		}
	};

	// 📌 Google логин
	const handleGoogleLogin = async () => {
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

	// 📌 Забыл пароль
	const handleResetPassword = async () => {
		if (!email) {
			setError('Введіть ел.пошту');
			return;
		}

		try {
			await sendPasswordResetEmail(auth, email);
			setMessage('Лист для скидання пароля надіслано');
		} catch (err) {
			setError('Помилка надсилання листа');
		}
	};

	return (
		<div className={`form login ${activeView === 'login' ? 'active' : ''}`}>
			<h2>Авторизуватись</h2>

			<form>
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
				{message && <p style={{ color: 'green' }}>{message}</p>}

				<button type="button" onClick={handleLogin}>
					Ввійти
				</button>
			</form>

			<p onClick={handleResetPassword} style={{ cursor: 'pointer' }}>
				Забули пароль?
			</p>

			<span>або</span>

			<button className="google" onClick={handleGoogleLogin}>
				Ввійти через Google
			</button>
		</div>
	);
};

export default LoginForm;
