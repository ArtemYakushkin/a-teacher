import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import LessonsPage from './pages/LessonsPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetPage from './pages/CourseDetPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import { AuthProvider } from './firebase/AuthContext';
import { AuthModalProvider } from './firebase/AuthModalContext';

const App = () => {
	return (
		<AuthProvider>
			<AuthModalProvider>
				<Router>
					<Header />
					<AuthModal />

					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="/lessons" element={<LessonsPage />} />
						<Route path="/courses" element={<CoursesPage />} />
						<Route
							path="/courses/:lessonId"
							element={<CourseDetPage />}
						/>
					</Routes>

					<Footer />
				</Router>
			</AuthModalProvider>
		</AuthProvider>
	);
};

export default App;
