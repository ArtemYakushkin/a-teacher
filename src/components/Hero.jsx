import { motion } from "framer-motion";

import main from "../assets/main-two.png";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-wrapp">
          <motion.div
            className="hero-content"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h1 className="hero-title">
              Learn <span className="hero-span">English</span> Today
            </h1>
            <p className="hero-text">
              Відчиняй двері новим можливостям за допомогою сили вивчення мови
            </p>
            <a className="hero-btn" href="#contacts">
              Почніть навчання сьогодні
            </a>
          </motion.div>

          <motion.div
            className="hero-img-box"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <img className="hero-img" src={main} alt="Hero" />

            <div className="hero-cards">
              <div className="hero-card">
                <span className="hero-advantage">300+</span>
                <p className="hero-description">успішних учнів</p>
              </div>
              <div className="hero-card">
                <span className="hero-advantage">15+</span>
                <p className="hero-description">років викладання</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
