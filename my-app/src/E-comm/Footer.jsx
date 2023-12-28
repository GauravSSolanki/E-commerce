import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import logo from "../imgs/Footer/logo.png";
import pay from "../imgs/Footer/pay.png";
import play from "../imgs/Footer/play.jpg";

function Footer() {
  return (
    <>
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
                <b>Address:</b> Vijay path Road, Street 3. NH:12
              </p>
              <p>
                <b>Phone:</b> +919587481609 , +919784844372
              </p>
              <p>
                <b>Hours</b> 10:00 - 18:00. Mon - fri
              </p>
            </address>
            <Link to="/">
              <h3>Follow Us</h3>
            </Link>
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
            <Link className="p-0"  to="/Cart">
              <a href="">Privacy Policy</a>
            </Link>
            <a href="#">Terms & Conditions</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="myaccount ">
            <h3>My account</h3>
            <br />
            <a href="">
              <Link  className="p-0" to="/">SignIn</Link>
            </a>
            <a href="">
              <Link className="p-0" to="/Cart">View Cart</Link>
            </a>
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

export default Footer;
