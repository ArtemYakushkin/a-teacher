import { useState } from 'react';

import Tabs from '../components/Tabs';
import CourseABC from '../components/CourseABC';

const CoursesPage = () => {
	const [activeTab, setActiveTab] = useState('courseABC');

	return (
		<section className="section">
			<div className="container">
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

				{activeTab === 'courseABC' && <CourseABC />}
			</div>
		</section>
	);
};

export default CoursesPage;
