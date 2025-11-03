import { useEffect } from "react";

import Hero from "../components/Hero";
import Services from "../components/Services";
import Reviews from "../components/Reviews";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#services") {
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <Hero />
      <Services />
      <Reviews />
    </div>
  );
};

export default Home;
