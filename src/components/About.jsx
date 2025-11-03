import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import aboutImg from "../assets/about-img.jpg";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const isMobile = useMediaQuery({ maxWidth: 1100 });

  const paragraphs = [
    "Вітаю! Мене звати Анна. Я - дипломований вчитель з кваліфікацією в галузі педагогіки та методики викладання англійської мови.",
    "Маю понад 15 років досвіду викладання, протягом яких навчила близько 300 учнів. Багато з них успішно адаптувалися в англомовних країнах, таких як США, Франція, Польща, Німеччина, Канада, Греція, вступивши до місцевих шкіл без необхідності складання додаткових мовних іспитів.",
    "У своїй роботі я дотримуюся комунікативного методу навчання, приділяючи особливу увагу індивідуальному підходу до кожного учня.",
    "Для розширення доступу до навчання я розробила онлайн курс англійської мови для дітей шкільного віку і базовий курс для дошкільнят у форматі телеграм каналу.",
    "Наразі працюю в творчій команді над створенням освітньої платформи, яка дозволить охопити більше учнів та надати їм якісні навчальні матеріали.",
    "Англійська - це провідник до прояву талантів моїх учнів. Кожному є що показати світу.",
    "Буду рада новим знайомствам і співпраці.",
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-wrapp">
          <div className="about-content" ref={ref}>
            <motion.div
              className="about-img-box"
              initial={isMobile ? {} : { x: -100, opacity: 0 }}
              animate={isMobile ? {} : isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 2 }}
            >
              <img className="about-img" src={aboutImg} alt="about img" />
            </motion.div>

            <motion.div
              className="about-text-box"
              initial={isMobile ? {} : { x: 100, opacity: 0 }}
              animate={isMobile ? {} : isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 2 }}
            >
              {(isExpanded ? paragraphs : paragraphs.slice(0, 2)).map((text, index) => (
                <p className="about-text" key={index}>
                  {text}
                </p>
              ))}
              <button className="about-btn-more" onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ? "Приховати текст" : "Читати більше"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
