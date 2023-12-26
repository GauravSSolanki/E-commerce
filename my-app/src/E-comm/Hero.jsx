import React from "react";

import logo from "../imgs/Footer/logo.png";
import "./Home.css";

function Hero() {
  return (
    <section className="hero">
      <a>
        <img src={logo} alt="Logo" />
      </a>
      <h4>Trade-in-offer</h4>
      <h2>Super value deals</h2>
      <h1>On all products</h1>
      <p>save more coupons & up to 30% off!</p>
      <button>Shop now</button>
    </section>
  );
}

export default Hero;
