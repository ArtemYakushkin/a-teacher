import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MobileMenu from "./MobileMenu";

import Logo from "../assets/Logo2.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToServices = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      // Уже на главной → прокручиваем
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // На другой странице → переходим с якорем
      navigate("/#services");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapp">
          <Link to={"/"}>
            <img className="header-logo" src={Logo} alt="logo" />
          </Link>

          <ul className="header-list">
            <li className="header-item">
              {/* <Link to={"/"}>Послуги</Link> */}
              <a href="/#services" onClick={handleScrollToServices}>
                Послуги
              </a>
            </li>
            <li className="header-item">
              <Link to={"/about"}>Про мене</Link>
            </li>
            <li className="header-item">
              <Link to={"/blog"}>Блог</Link>
            </li>
            <li className="header-item">
              <Link to={"/lessons"}>Уроки</Link>
            </li>
          </ul>

          <button className="header-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`header-burger ${menuOpen ? "open" : ""}`} isOpen={menuOpen}></div>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
