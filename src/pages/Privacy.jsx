import { useEffect } from 'react';

const Privacy = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="section">
			<div className="container">
				<div className="legal-wrap">
					<h1 className="legal-title">Політика конфіденційності</h1>
					<h3 className="legal-subtitle">1. Збір даних</h3>
					<p className="legal-text">
						Ми збираємо лише ваш Email та унікальний ID користувача
						для ідентифікації вашого доступу до оплачених курсів.
					</p>

					<h3 className="legal-subtitle">2. Безпека платежів</h3>
					<p className="legal-text">
						<strong>Важливо:</strong> Ми не збираємо та не
						зберігаємо дані ваших банківських карток. Обробка
						платежу відбувається за платіжної системи WayForPay, яка
						сертифікована за стандартом PCI DSS.
					</p>

					<h3 className="legal-subtitle">
						3. Використання інформації
					</h3>
					<p className="legal-text">
						Ваші дані використовуються виключно для технічного
						забезпечення доступу до сайту та не передаються третім
						особам.
					</p>

					<div className="legal-back">
						<a href="/">← Повернутися на головну</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Privacy;
