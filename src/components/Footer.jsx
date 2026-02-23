import { Link } from 'react-router-dom';
import {
	PiTelegramLogo,
	PiInstagramLogo,
	PiEnvelopeSimpleOpenLight,
} from 'react-icons/pi';

import Logo from '../assets/Logo3.png';
import Way from '../assets/footer/wayforpay_logo_mixfin-1024x205.webp';
import Visa from '../assets/footer/Visa_Inc._logo_(2021–present).svg.png';
import Master from '../assets/footer/master_card.png';

const Footer = () => {
	return (
		<footer id="contacts">
			<div className="footer-top">
				<div className="container">
					<div className="footer-top-wrapp">
						<Link to={'/'}>
							<img className="logo" src={Logo} alt="logo" />
						</Link>

						<ul className="footer-list">
							<li className="footer-item">
								<a
									href="tg://resolve?domain=AnnaYakushkina"
									target="_blank"
									rel="noreferrer"
								>
									<PiTelegramLogo
										size={24}
										style={{ marginTop: '5px' }}
									/>
								</a>
							</li>

							<li className="footer-item">
								<a
									href="https://www.instagram.com/start_english_today?igsh=MTdxdGJsZnQ1YWNxbQ=="
									target="_blank"
									rel="noreferrer"
								>
									<PiInstagramLogo
										size={24}
										style={{ marginTop: '5px' }}
									/>
								</a>
							</li>

							<li className="footer-item">
								<a
									href="mailto:mrs.anna.teacher@gmail.com"
									target="_blank"
									rel="noreferrer"
								>
									<PiEnvelopeSimpleOpenLight
										size={24}
										style={{ marginTop: '3px' }}
									/>
								</a>
							</li>
						</ul>

						<div className="footer-pay-block">
							<div className="footer-pay-img">
								<img
									src={Way}
									alt="way for pay"
									style={{ width: '60px' }}
								/>
								<img
									src={Visa}
									alt="visa"
									style={{ width: '35px' }}
								/>
								<img
									src={Master}
									alt="master card"
									style={{ width: '35px' }}
								/>
							</div>

							<Link className="footer-privacy" to={'/privacy'}>
								Політика конфіденційності
							</Link>
							<Link className="footer-privacy" to={'/terms'}>
								Публічна оферта
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<div className="container">
					<p className="footer-copy">
						© 2025 A-Teacher. Усі платежі захищені.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
