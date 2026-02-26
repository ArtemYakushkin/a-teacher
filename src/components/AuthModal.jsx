import { useState, useEffect } from 'react';
import { useAuthModal } from '../firebase/AuthModalContext';

import Background from './ModalComponents/Background';
import TextSection from './ModalComponents/TextSection';
import RegisterForm from './ModalComponents/RegisterForm';
import LoginForm from './ModalComponents/LoginForm';

const AuthModal = () => {
	const { isOpen, setIsOpen } = useAuthModal();
	const [activeView, setActiveView] = useState('login');
	const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 550);
		};

		// 2. Подписываемся на изменение размера окна
		window.addEventListener('resize', handleResize);

		// Очистка слушателя при размонтировании
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const toggleView = () => {
		setActiveView(activeView === 'login' ? 'register' : 'login');
	};

	if (!isOpen) return null;

	return (
		<div className="modal-backdrop" onClick={() => setIsOpen(false)}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				{!isMobile && <Background activeView={activeView} />}

				{!isMobile && (
					<TextSection
						type="register"
						activeView={activeView}
						title="Ласкаво просимо назад"
						text="Увійдіть, щоб переглянути більш розширений функціонал."
						buttonText="Авторизуватися"
						onToggle={toggleView}
					/>
				)}

				<RegisterForm activeView={activeView} onToggle={toggleView} />

				{!isMobile && (
					<TextSection
						type="login"
						activeView={activeView}
						title="Привіт!"
						text="Почніть навчання за допомогою моїх курсів."
						buttonText="Зареєструватися"
						onToggle={toggleView}
					/>
				)}

				<LoginForm activeView={activeView} onToggle={toggleView} />
			</div>
		</div>
	);
};

export default AuthModal;
