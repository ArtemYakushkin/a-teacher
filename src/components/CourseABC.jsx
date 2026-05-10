import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/AuthContext';
import Anna from '../assets/Anna-course.jpg';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoMdFlash } from 'react-icons/io';
import { FaGamepad } from 'react-icons/fa6';
import { FaRegSmileBeam } from 'react-icons/fa';

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
		<div className="course-grid">
			<div className="course-card course-card-hero">
				<h1>
					Курс ABC "Легкий старт в англійській: навчіть дитину читати
					без сліз та протестів за 20 занять"
				</h1>
				<p>
					​​Втомилися змушувати дитину вчитися? Мої уроки побудовані
					так, що дитина сама просить "ще один ролик", а ви отримуєте
					10 хвилин вільного часу на каву. Курс "ABC" - це початковий
					курс ...
				</p>
				<div>
					<button
						className="course-btn"
						disabled={hasAccess}
						onClick={handleBuy}
					>
						{hasAccess
							? 'Курс відкрито'
							: 'Відкрити курс за 490 грн.'}
					</button>
				</div>
			</div>

			<div className="course-card course-card-author">
				<img src={Anna} alt="Автор" />
				<div className="course-author-info">
					<strong>Автор курсу</strong>
				</div>
			</div>

			<div className="course-card course-card-result">
				<div class="icon">
					<IoIosCheckmarkCircle size={40} color="var(--coral)" />
				</div>
				<h3>Знає алфавіт і звуки</h3>
				<p>Впевнено розпізнає літери та звуки, не плутаючи їх.</p>
			</div>

			<div className="course-card course-card-highlight">
				<div class="icon">
					<IoMdFlash size={28} color="var(--coral)" />
				</div>
				<h3>Починає читати прості слова</h3>
				<p>
					Дитина прочитає свої перші слова вже після першого тижня
					занять.
				</p>
			</div>

			<div className="course-card course-card-result">
				<div class="icon">
					<FaGamepad size={40} color="var(--coral)" />
				</div>
				<h3>Розуміє базову лексику</h3>
				<p>
					Сприймає англійську як природний спосіб гри та пізнання
					світу.
				</p>
			</div>

			<div className="course-card course-card-result">
				<div class="icon">
					<FaRegSmileBeam size={40} color="var(--coral)" />
				</div>
				<h3>Відповідає на прості питання</h3>
				<p>
					Відчуває гордість, коли може сказати перші фрази
					англійською.
				</p>
			</div>

			<div className="course-card course-card-lessons">
				<h3>Програма: 20 відеоуроків</h3>
				<p>
					Доступ до всіх матеріалів відкривається одразу після оплати.
				</p>
				<div className="course-lessons-grid">
					{lessons.map((lesson) => (
						<div
							key={lesson.id}
							className={`course-lesson-item ${!hasAccess ? 'locked' : ''}`}
						>
							{hasAccess ? (
								<Link to={`/courses/${lesson.id}`}>
									<img
										src={lesson.image}
										alt={lesson.title}
									/>
								</Link>
							) : (
								<div className="courses-locked">
									<FaLock className="courses-locked-icon" />
									<img
										src={lesson.image}
										alt={lesson.title}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="course-card course-card-footer">
				<div>
					<h3>Зручно для дітей і батьків</h3>
					<p>
						• 5–10 хв на день • без перевантаження • у вашому темпі
					</p>
				</div>
				<div class="course-price-box">
					<div class="course-price">490 грн.</div>
					<button
						className="course-btn"
						disabled={hasAccess}
						onClick={handleBuy}
					>
						{hasAccess ? 'Курс відкрито' : 'Придбати курс'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseABC;
