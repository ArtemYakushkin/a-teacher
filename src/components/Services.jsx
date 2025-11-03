import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { IoMdCheckmark } from "react-icons/io";

import { servicesData } from "../data/services";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isMobile = useMediaQuery({ maxWidth: 1100 });

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
                animate={isMobile ? {} : isInView ? { x: 0, y: 0, opacity: 1 } : {}}
                transition={{ duration: 1 }}
              >
                {/* <div className="services-inner"> */}
                <div className="services-title-box">
                  <img className="services-title-img" src={service.image} alt={service.id} />
                  <h4 className="services-title-text">{service.title}</h4>
                </div>

                <p className="services-subtitle">{service.subtitle}</p>

                <ul className="services-list-point">
                  {service.points.map((point, i) => (
                    <li className="services-item-point" key={i}>
                      <div className="services-icon-point">
                        <IoMdCheckmark size={24} />
                      </div>
                      <p className="services-text-point">{point}</p>
                    </li>
                  ))}
                </ul>

                {service.price && (
                  <div className="services-price">
                    <div className="services-price-box">
                      {/* <img className="services-price-icon" src={service.price.icon} alt="fire" /> */}
                      <p className="services-price-amount">{service.price.amount}</p>
                    </div>
                    <span className="services-price-note">{service.price.note}</span>
                  </div>
                )}

                <div className="services-btn-box">
                  <a
                    className="services-btn"
                    href="tg://resolve?domain=AnnaYakushkina"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Залишити заявку
                  </a>
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
