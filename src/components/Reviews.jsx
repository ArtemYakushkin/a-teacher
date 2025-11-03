import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import { IoIosArrowDown } from "react-icons/io";

import { reviewsData } from "../data/reviews";

const Reviews = () => {
  const [openId, setOpenId] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const toggleReview = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-wrapp" ref={ref}>
          <h2 className="reviews-title">Відгуки</h2>

          <motion.ul
            className="reviews-list"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 2 }}
          >
            {[...reviewsData].reverse().map((review) => (
              <li
                className="reviews-item"
                key={review.id}
                open={openId === review.id}
                onClick={() => toggleReview(review.id)}
              >
                <div className="reviews-content">
                  <div className="reviews-user">
                    <div className="reviews-avatar">
                      <img src={review.avatar} alt="" />
                    </div>
                    <div className="reviews-nickname">
                      <p>{review.title}</p>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <p className={`reviews-text ${openId === review.id ? "open" : ""}`}>
                    {review.text}
                  </p>
                </div>
                <button className={`reviews-btn ${openId === review.id ? "open" : ""}`}>
                  <span>
                    <IoIosArrowDown size={30} />
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
