import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CoursesPage = () => {
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true);

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

	return (
		<div className="lessons-list" style={{ marginTop: '200px' }}>
			{lessons.map((lesson) => (
				<div className="lesson-card" key={lesson.id}>
					<img src={lesson.image} alt={lesson.title} />
					<img src={lesson.vocabulare} alt={lesson.title} />

					<h3>{lesson.title}</h3>
					<p>{lesson.description}</p>

					<a href={lesson.video} target="_blank" rel="noreferrer">
						Переглянути відео
					</a>
					<a href={lesson.game} target="_blank" rel="noreferrer">
						Грати
					</a>
				</div>
			))}
		</div>
	);
};

export default CoursesPage;
