import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
		<section className="section">
			<div className="container">
				<div className="courses-list">
					{lessons.map((lesson) => (
						<Link to={`/courses/${lesson.id}`} key={lesson.id}>
							<div className="courses-card">
								<img src={lesson.image} alt={lesson.title} />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default CoursesPage;
