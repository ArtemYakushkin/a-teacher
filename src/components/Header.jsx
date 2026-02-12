import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { useAuthModal } from '../firebase/AuthModalContext';

import MobileMenu from './MobileMenu';
import LogoutModal from './LogoutModal';
import Logo from '../assets/Logo2.png';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [logoutOpen, setLogoutOpen] = useState(false);
	const { user, logout } = useAuth();
	const { setIsOpen } = useAuthModal();
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

	const handleCoursesClick = () => {
		if (!user) {
			setIsOpen(true);
		} else {
			navigate('/courses');
		}
	};

	const handleLogoutConfirm = async () => {
		await logout();
		setLogoutOpen(false);
		navigate('/');
	};

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header-wrapp">
						<Link to={'/'}>
							<img
								className="header-logo"
								src={Logo}
								alt="logo"
							/>
						</Link>

						<div className="header-actions">
							<ul className="header-list">
								<li className="header-item">
									<a
										href="/#services"
										onClick={handleScrollToServices}
									>
										Послуги
									</a>
								</li>
								<li className="header-item">
									<Link to={'/about'}>Про мене</Link>
								</li>
								<li className="header-item">
									<Link to={'/blog'}>Блог</Link>
								</li>
								<li className="header-item">
									<Link to={'/lessons'}>Уроки</Link>
								</li>
								<li className="header-item">
									<button
										onClick={handleCoursesClick}
										style={{ fontWeight: 700 }}
									>
										Курси
									</button>
								</li>
							</ul>

							{user && (
								<div
									className="header-user"
									onClick={() => setLogoutOpen(true)}
								>
									{user.displayName?.charAt(0).toUpperCase()}
								</div>
							)}

							<button
								className="header-menu-btn"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								<div
									className={`header-burger ${menuOpen ? 'open' : ''}`}
								></div>
							</button>
						</div>
					</div>
				</div>

				<MobileMenu
					isOpen={menuOpen}
					closeMenu={() => setMenuOpen(false)}
				/>
			</header>

			{logoutOpen && (
				<LogoutModal
					onConfirm={handleLogoutConfirm}
					onCancel={() => setLogoutOpen(false)}
					setLogoutOpen={setLogoutOpen}
				/>
			)}
		</>
	);
};

export default Header;
