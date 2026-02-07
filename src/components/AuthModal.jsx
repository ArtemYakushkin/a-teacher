import { useState } from 'react';
import { useAuthModal } from '../firebase/AuthModalContext';

import Background from './ModalComponents/Background';
import TextSection from './ModalComponents/TextSection';
import RegisterForm from './ModalComponents/RegisterForm';
import LoginForm from './ModalComponents/LoginForm';

const AuthModal = () => {
	const { isOpen, setIsOpen } = useAuthModal();
	const [activeView, setActiveView] = useState('login');

	const toggleView = () => {
		setActiveView(activeView === 'login' ? 'register' : 'login');
	};

	if (!isOpen) return null;

	return (
		<div className="modal-backdrop" onClick={() => setIsOpen(false)}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<Background activeView={activeView} />

				<TextSection
					type="register"
					activeView={activeView}
					title="Ласкаво просимо назад"
					text="Увійдіть, щоб переглянути більш розширений функціонал."
					buttonText="Авторизуватися"
					onToggle={toggleView}
				/>

				<RegisterForm activeView={activeView} />

				<TextSection
					type="login"
					activeView={activeView}
					title="Привіт!"
					text="Почніть навчання за допомогою моїх курсів."
					buttonText="Зареєструватися"
					onToggle={toggleView}
				/>

				<LoginForm activeView={activeView} />
			</div>
		</div>
	);
};

export default AuthModal;
