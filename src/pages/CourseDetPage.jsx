import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	doc,
	getDoc,
	collection,
	getDocs,
	query,
	orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { FaRegCirclePlay } from 'react-icons/fa6';

const CourseDetPage = () => {
	const { lessonId } = useParams();

	const [lesson, setLesson] = useState(null);
	const [allLessons, setAllLessons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [play, setPlay] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const ref = doc(db, 'courseABC', lessonId);
				const snap = await getDoc(ref);
				if (snap.exists()) {
					setLesson(snap.data());
				}

				const q = query(
					collection(db, 'courseABC'),
					orderBy('order', 'asc'),
				);
				const allSnap = await getDocs(q);
				const lessonsList = allSnap.docs.map((doc) => ({
					id: doc.id,
					order: doc.data().order,
				}));
				setAllLessons(lessonsList);
			} catch (err) {
				console.error('Помилка завантаження:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		setPlay(false);
	}, [lessonId]);

	if (loading) return <p>Завантаження уроку...</p>;
	if (!lesson) return <p>Урок не знайдено</p>;

	const videoId = lesson.video.includes('youtu.be')
		? lesson.video.split('/').pop()
		: lesson.video.split('v=')[1];

	return (
		<section className="section">
			<div className="container">
				<div className="stepper-wrapper">
					{allLessons.map((item, index) => (
						<div key={item.id} className="stepper-item-container">
							<Link
								to={`/courses/${item.id}`}
								className={`stepper-circle ${item.id === lessonId ? 'active' : ''}`}
							>
								{index + 1}
							</Link>
							{index < allLessons.length - 1 && (
								<div className="stepper-line"></div>
							)}
						</div>
					))}
				</div>

				<div className="courses-wrap">
					<div className="courses-info">
						<div className="courses-poster">
							{!play ? (
								<>
									<img src={lesson.image} alt="poster" />
									<div
										className="courses-overlay"
										onClick={() => setPlay(true)}
									>
										<FaRegCirclePlay className="courses-icon" />
									</div>
								</>
							) : (
								<div className="courses-video-wrapper">
									<iframe
										src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
										title={lesson.title}
										frameBorder="0"
										allow="autoplay; encrypted-media"
										allowFullScreen
									/>
								</div>
							)}
						</div>
						<div className="courses-content">
							<h1 className="courses-title">{lesson.title}</h1>
							<p className="courses-text">{lesson.description}</p>
							<div className="courses-actions">
								{lesson.game?.map((link, index) => (
									<a
										key={index}
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className="courses-game"
									>
										{lesson.actions?.[index]}
									</a>
								))}
							</div>
						</div>
					</div>
					<div className="courses-dictionary">
						<img src={lesson.vocabulare} alt="dictionary" />
					</div>
					<p className="courses-conclusion">* {lesson.conclusion}</p>
				</div>
			</div>
		</section>
	);
};

export default CourseDetPage;
