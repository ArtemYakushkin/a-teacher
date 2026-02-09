import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { FaRegCirclePlay } from 'react-icons/fa6';

const CourseDetPage = () => {
	const { lessonId } = useParams();

	const [lesson, setLesson] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLesson = async () => {
			try {
				const ref = doc(db, 'courseABC', lessonId);
				const snap = await getDoc(ref);

				if (snap.exists()) {
					setLesson(snap.data());
				}
			} catch (err) {
				console.error('Помилка завантаження уроку:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchLesson();
	}, [lessonId]);

	if (loading) return <p>Завантаження уроку...</p>;
	if (!lesson) return <p>Урок не знайдено</p>;

	return (
		<section className="section">
			<div className="container">
				<div className="courses-wrap">
					<div className="courses-info">
						<a
							href={lesson.video}
							target="_blank"
							rel="noopener noreferrer"
							className="courses-poster"
						>
							<img src={lesson.image} alt="poster" />

							<div className="courses-overlay">
								<FaRegCirclePlay className="courses-icon" />
							</div>
						</a>

						<div className="courses-content">
							<h1 className="courses-title">{lesson.title}</h1>
							<p className="courses-text">{lesson.description}</p>
							<a
								href={lesson.game}
								target="_blank"
								rel="noopener noreferrer"
								className="courses-game"
							>
								Зіграти в гру
							</a>
						</div>
					</div>

					<div className="courses-dictionary">
						<img src={lesson.vocabulare} alt="dictionary" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseDetPage;
