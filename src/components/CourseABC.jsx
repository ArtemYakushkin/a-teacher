import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/AuthContext';

import { FaLock } from 'react-icons/fa';

const Wayforpay = window.Wayforpay;

const CourseABC = () => {
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true);
	const { userData, user } = useAuth();

	useEffect(() => {
		const fetchLessons = async () => {
			try {
				const q = query(
					collection(db, 'courseABC'),
					orderBy('order', 'asc'),
				);

				const snapshot = await getDocs(q);

				const lessonsData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setLessons(lessonsData);
			} catch (error) {
				console.error('Помилка завантаження уроків:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchLessons();
	}, []);

	if (loading) {
		return <p>Завантаження уроків...</p>;
	}

	const hasAccess = userData?.hasCourseABC;

	const handleBuy = async () => {
		const res = await fetch('/.netlify/functions/create-payment', {
			method: 'POST',
			body: JSON.stringify({
				amount: 500, // цена курса
				productName: 'English Course',
				userEmail: user.email,
				userId: user.uid,
			}),
		});
		const paymentConfig = await res.json();

		const wayforpay = new Wayforpay();
		wayforpay.run(
			paymentConfig,
			(res) => alert('Оплачено! Доступ откроется через минуту.'),
			(err) => alert('Ошибка или отказ'),
		);
	};

	return (
		<div>
			<button
				className="courses-lock-btn"
				disabled={hasAccess}
				onClick={handleBuy}
			>
				{hasAccess ? 'Курс відкрито' : 'Відкрити курс'}
			</button>

			<div className="courses-list">
				{lessons.map((lesson) => (
					<div
						key={lesson.id}
						className={`courses-card ${!hasAccess ? 'locked' : ''}`}
					>
						{hasAccess ? (
							<Link to={`/courses/${lesson.id}`}>
								<img src={lesson.image} alt={lesson.title} />
							</Link>
						) : (
							<div className="courses-locked">
								<FaLock className="courses-locked-icon" />
								<img src={lesson.image} alt={lesson.title} />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CourseABC;
