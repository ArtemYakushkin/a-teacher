import { Link, useNavigate } from 'react-router-dom';

const MobileMenu = ({ isOpen, closeMenu }) => {
	const navigate = useNavigate();

	const handleScrollToServices = (e) => {
		e.preventDefault();
		if (window.location.pathname === '/') {
			const section = document.getElementById('services');
			section?.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigate('/#services');
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

			<Link className="menu-item" to={'/courses'} onClick={closeMenu}>
				Курси
			</Link>
		</div>
	);
};

export default MobileMenu;
