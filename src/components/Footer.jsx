import { PiTelegramLogo, PiInstagramLogo, PiEnvelopeSimpleOpenLight } from "react-icons/pi";

const Footer = () => {
  return (
    <footer id="contacts">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-wrapp">
            <h2 className="footer-title">Зв’язок зі мною</h2>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="tg://resolve?domain=AnnaYakushkina" target="_blank" rel="noreferrer">
                  <PiTelegramLogo size={40} />
                  <span>@AnnaYakushkina</span>
                </a>
              </li>

              <li className="footer-item">
                <a
                  href="https://www.instagram.com/start_english_today?igsh=MTdxdGJsZnQ1YWNxbQ=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <PiInstagramLogo size={40} />
                  <span>start_english_today</span>
                </a>
              </li>

              <li className="footer-item">
                <a href="mailto:mrs.anna.teacher@gmail.com" target="_blank" rel="noreferrer">
                  <PiEnvelopeSimpleOpenLight size={40} />
                  <span>mrs.anna.teacher@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copy">© 2025 Всі права захищені. Розроблено Артем Якушкін.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
