import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/AuthContext';

import { FaLock } from 'react-icons/fa';

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
	// const hasAccess = true;

	const handleBuy = async () => {
		const res = await fetch('/.netlify/functions/create-payment', {
			method: 'POST',
			body: JSON.stringify({
				amount: 490, // цена курса
				productName: 'English Course',
				userEmail: user.email,
				userId: user.uid,
			}),
		});
		const paymentConfig = await res.json();

		const wayforpay = new window.Wayforpay();
		wayforpay.run(
			paymentConfig,
			function (response) {
				console.log('Успех', response);
				alert('Оплата прошла!');
			},
			function (response) {
				console.log('Ошибка', response);
				alert('Ошибка: ' + response.reasonCode);
			},
		);
	};

	return (
		<div>
			<div className="course-description">
				<h2>🎓 Курс ABC</h2>

				<p style={{ whiteSpace: 'pre-line', marginBottom: '15px' }}>
					Це початковий курс з читання для дітей 3–7 років. {'\n'}У
					курсі 20 коротких відеоуроків (2–10 хв), словник до кожного
					уроку, інтерактивні ігри та доступ одразу після оплати до
					всіх уроків.
				</p>

				<p>Після курсу дитина:</p>

				<div className="course-benefits">
					<div className="course-benefit-item">
						✔️ знає алфавіт і звуки
					</div>
					<div className="course-benefit-item">
						✔️ починає читати прості слова
					</div>
					<div className="course-benefit-item">
						✔️ розуміє базову лексику
					</div>
					<div className="course-benefit-item">
						✔️ може відповідати на прості питання 📦
					</div>
				</div>

				<p
					style={{
						fontSize: '0.9rem',
						color: '#666',
						fontStyle: 'italic',
					}}
				>
					💡 Зручно для дітей і батьків: • 5–10 хв на день • без
					перевантаження • у вашому темпі
				</p>
			</div>

			<button
				className="courses-lock-btn"
				disabled={hasAccess}
				onClick={handleBuy}
			>
				{hasAccess ? 'Курс відкрито' : 'Відкрити курс за 490 грн.'}
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
