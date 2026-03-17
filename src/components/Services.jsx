import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { IoMdCheckmark } from 'react-icons/io';

import { servicesData } from '../data/services';
import { useAuth } from '../firebase/AuthContext';
import { useAuthModal } from '../firebase/AuthModalContext';

const Services = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });
	const { user } = useAuth();
	const { setIsOpen } = useAuthModal();
	const navigate = useNavigate();

	const isMobile = useMediaQuery({ maxWidth: 1100 });

	const handleCoursesClick = () => {
		if (!user) {
			setIsOpen(true);
		} else {
			navigate('/courses');
		}
	};

	return (
		<section className="services-section" id="services">
			<div className="container">
				<div className="services-wrapp" ref={ref}>
					<h2 className="services-title">Мої послуги</h2>
					<ul className="services-list">
						{servicesData.map((service, index) => (
							<motion.li
								className="services-item"
								key={service.id}
								initial={
									isMobile
										? {}
										: index === 0
											? { x: -100, opacity: 0 }
											: index === 1
												? { y: 100, opacity: 0 }
												: { x: 100, opacity: 0 }
								}
								animate={
									isMobile
										? {}
										: isInView
											? { x: 0, y: 0, opacity: 1 }
											: {}
								}
								transition={{ duration: 1 }}
							>
								{/* <div className="services-inner"> */}
								<div className="services-title-box">
									<img
										className="services-title-img"
										src={service.image}
										alt={service.id}
									/>
									<h4 className="services-title-text">
										{service.title}
									</h4>
								</div>

								<p className="services-subtitle">
									{service.subtitle}
								</p>

								<ul className="services-list-point">
									{service.points.map((point, i) => (
										<li
											className="services-item-point"
											key={i}
										>
											<div className="services-icon-point">
												<IoMdCheckmark size={24} />
											</div>
											<p className="services-text-point">
												{point}
											</p>
										</li>
									))}
								</ul>

								<div className="services-result">
									<span>{service.result}</span>
									<p>{service.resultText}</p>
								</div>

								{service.price && (
									<div className="services-price">
										<div className="services-price-box">
											{/* <img className="services-price-icon" src={service.price.icon} alt="fire" /> */}
											<p className="services-price-amount">
												{service.price.amount}
											</p>
										</div>
										<span className="services-price-note">
											{service.price.note}
										</span>
									</div>
								)}

								<div className="services-btn-box">
									{service.type === 'external' && (
										<a
											className="services-btn"
											href={service.action}
											target="_blank"
											rel="noreferrer"
										>
											{service.link}
										</a>
									)}

									{service.type === 'modal' && (
										<button
											className="services-btn"
											onClick={() =>
												handleCoursesClick(
													service.action,
												)
											}
										>
											{service.link}
										</button>
									)}
								</div>
								{/* </div> */}
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Services;
