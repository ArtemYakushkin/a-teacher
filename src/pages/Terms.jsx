import { useEffect } from 'react';

const Terms = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="section">
			<div className="container">
				<div className="legal-wrap">
					<h1 className="legal-title">Публічна оферта</h1>
					<h3 className="legal-subtitle">1. Загальні положення</h3>
					<p className="legal-text">
						Цей документ є офіційною пропозицією (Публічна оферта)
						онлайн-платформи "A-Teacher" для будь-якої фізичної
						особи укласти договір на отримання доступу до
						онлайн-курсу на умовах, наведених нижче.
					</p>

					<h3 className="legal-subtitle">2. Предмет договору</h3>
					<p className="legal-text">
						Продавець надає доступ до навчальних матеріалів курсу
						"English Course" після підтвердження оплати, а Покупець
						оплачує послуги відповідно до встановленої ціни.
					</p>

					<h3 className="legal-subtitle">
						3. Порядок оплати та надання доступу
					</h3>
					<ul>
						<li className="legal-text">
							- Оплата здійснюється через захищений віджет
							WayForPay.
						</li>
						<li className="legal-text">
							- Доступ до курсу відкривається автоматично в
							особистому кабінеті користувача відразу після
							успішної транзакції.
						</li>
					</ul>

					<h3 className="legal-subtitle">4. Політика повернення</h3>
					<p className="legal-text">
						Відповідно до законодавства про цифровий контент,
						повернення коштів після надання доступу до матеріалів не
						передбачено. У разі технічних збоїв, що перешкоджають
						отримання доступу, повернення здійснюється протягом 14
						днів за зверненням на email або телефон.
					</p>

					<h3 className="legal-subtitle">5. Контакти</h3>
					<ul>
						<li className="legal-text">
							- Email: mrs.anna.teacher@gmail.com
						</li>
						<li className="legal-text">
							- Телефон: +38 (097) 704-60-04
						</li>
					</ul>

					<div className="legal-back">
						<a href="/">← Повернутися на головну</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Terms;
