import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../firebase/AuthContext';
import { useAuthModal } from '../firebase/AuthModalContext';

const MobileMenu = ({ isOpen, closeMenu }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { setIsOpen } = useAuthModal();

	const handleScrollToServices = (e) => {
		e.preventDefault();
		if (window.location.pathname === '/') {
			const section = document.getElementById('services');
			section?.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigate('/#services');
		}
	};

	const handleCoursesClick = () => {
		if (!user) {
			setIsOpen(true);
		} else {
			navigate('/courses');
		}
	};

	return (
		<div className={`menu-wrapp ${isOpen ? 'open' : ''}`}>
			<a
				className="menu-item"
				href="/#services"
				onClick={(e) => {
					handleScrollToServices(e);
					closeMenu();
				}}
			>
				Послуги
			</a>

			<Link className="menu-item" to={'/about'} onClick={closeMenu}>
				Про мене
			</Link>

			<Link className="menu-item" to={'/blog'} onClick={closeMenu}>
				Блог
			</Link>

			<Link className="menu-item" to={'/lessons'} onClick={closeMenu}>
				Уроки
			</Link>

			<button
				className="menu-item"
				onClick={() => {
					handleCoursesClick();
					closeMenu();
				}}
			>
				Курси
			</button>
		</div>
	);
};

export default MobileMenu;
