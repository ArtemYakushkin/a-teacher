import { useState } from "react";
import Modal from "react-modal";
import { FaRegCirclePlay } from "react-icons/fa6";
import { lessonsData } from "../data/lessons";

Modal.setAppElement("#root");

const LessonsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (lessonId) => {
    setSelectedImage(lessonId);
  };

  const closeImageModal = () => setSelectedImage(null);

  return (
    <section className="section">
      <div className="container">
        <ul className="list">
          {lessonsData.map((lesson) => (
            <li className="lessons-item" key={lesson.id}>
              <div className="lessons-active">
                <a
                  href={lesson.linkVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lessons-poster"
                >
                  <img src={lesson.posterImg} alt="poster" />

                  <div className="lessons-overlay">
                    <FaRegCirclePlay className="lessons-icon"/>
                  </div>
                </a>

                <div className="lessons-btn-box">
                  <button
                    onClick={() => openImageModal(lesson.id)}
                    className="lessons-button"
                  >
                    Словник
                  </button>
                </div>
              </div>

              <div className="lessons-info">
                <h2 className="lessons-title">Урок "{lesson.title}"</h2>

                <p className="lessons-text">{lesson.text}</p>

                <a
                  href={lesson.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lessons-link"
                >
                  {lesson.linkText}
                </a>

                <p className="lessons-subtext">{lesson.subText}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeImageModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Image Modal"
      >
        {selectedImage && (
          <div className="modal-image">
            <img
              src={lessonsData.find((l) => l.id === selectedImage)?.img}
              alt="Словник"
            />
          </div>
        )}
      </Modal>
    </section>
  );
};

export default LessonsPage;
