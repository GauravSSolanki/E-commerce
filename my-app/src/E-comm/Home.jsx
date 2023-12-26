import React, { useEffect } from "react";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import Product from "./Product";
import Login from "../SignUp/Login";
import Hero from "./Hero";

// import sale4 from "../imgs/sale4.jpg";
// import sale7 from "../imgs/sale7.jpeg";
// import sale8 from "../imgs/sale8.jpeg";

import logo from "../imgs/Footer/logo.png";
import pay from "../imgs/Footer/pay.png";
import play from "../imgs/Footer/play.jpg";

function Home() {
  const [Products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (response.ok) {
        const jsonData = await response.json();
        setProducts(jsonData.products);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (Product.length === 0) {
    return (
      <>
        <div
          class="spinner-border text-danger"
          style={{ position: "fixed", top: "45vh", right: "50vw" }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero />

      <div className="off-banner">
        <h3>Vouchers</h3>
        <h2>Up to 70% Off - All t-Shirts & Accessories</h2>
        <button className="normal">Explore More</button>
      </div>

      <section className="Home-Section" id="Shop">
        <hr />
        <div className="Main-card">
          {Products ? (
            <ul className="product-lists flex-wrap" style={{ padding: "0px" }}>
              {Products.map((item) => (
                <Product product={item} id={item.id}/>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>

      <section className="banners">
        <div className="big-banners">
          <div className="big-banners-1">
            <h4>crazy deals</h4>
            <h2>buy 1 get 1 free</h2>
            <span>The best classic dress is on sale at coro</span>
            <button class="banner-btn">Learn More</button>
          </div>
          <div className="big-banners-2">
            <h4>spring/summer</h4>
            <h2>upcomming season</h2>
            <span>The best classic dress is on sale at cara</span>
            <button className="banner-btn">Collection</button>
          </div>
        </div>
        <div className="small-banners">
          <div className="small-banners-1">
            <h2>SEASONAL SALE</h2>
            <h5>Winter Collection 50% Off</h5>
          </div>
          <div className="small-banners-2">
            <h2>NEW FOOTWEAR COLLECTION</h2>
            <h5>Spring/Summer 2022</h5>
          </div>
          <div className="small-banners-3">
            <h2>T-SHIRTS</h2>
            <h5>New Trendy Prints</h5>
          </div>
        </div>
      </section>

      {/* news letter */}

      <section className="newsletter">
        <div class="newsletter-text">
          <h3>Sign Up For Newsletters</h3>
          <h5>
            get e-mail updates about out latest shop and{" "}
            <span>special offers</span>
          </h5>
        </div>
        <div class="form">
          <input
            type="email"
            placeholder="Your email address"
            id="email-address-input"
          />
          <button>Sign Up</button>
        </div>
      </section>

      <footer>
        <div className="footer">
          <div className="contact">
            <a href="">
              <img src={logo} alt="" />
            </a>
            <br />
            <h3>Contact</h3>
            <address>
              <p>
                <b>Address:</b> Wellington Road, Street 32. San Francisco
              </p>
              <p>
                <b>Phone:</b> Wellington Road, Street 32. San Francisco
              </p>
              <p>
                <b>Hours</b> 10:00 - 18:00. Mon - Sat
              </p>
            </address>
            <h3>Follow Us</h3>
            <br />
            <div class="socials">
              {/* <a href="#">
                <i class="fa-brands fa-facebook-square"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-telegram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-twitter"></i>
              </a> */}
            </div>
          </div>
          <div class="about">
            <h3>About</h3>
            <br />
            <a href="#">About Us</a>
            <a href="#">Delivery Information</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="myaccount ">
            <h3>My account</h3>
            <br />
            <a href=""><Link to="/Signin">SignIn</Link></a>
            <a href=""><Link to="/Cart">View Cart</Link></a>
            <a href="#">My Wishlist</a>
            <a href="#">Track My Order</a>
            <a href="#">Help</a>
          </div>
          <div class="install">
            <br />
            <div class="download">
              <a href="#">
                <img src={play} alt="" />
              </a>
            </div>
            <p>Secured Payment Gateways</p>
            <img src={pay} alt="" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
