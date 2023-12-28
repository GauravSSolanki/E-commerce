import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

import { BsList } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";

function Navbar() {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{
          height: "10vh",
          color: "white",
          backgroundColor: "#e3e6f3",
          boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.75)",
        }}
      >
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link ml-4 mr-3" to="/Home">
                <BsHouseDoor style={{ fontSize: "3vh" }} /> Home
              </Link>
            </li>

            <li class="nav-item active">
              <Link class="nav-link mr-4" to="/Cart">
                <BsCart style={{ fontSize: "3vh" }} />
                cart
              </Link>
            </li>

            {/* <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <BsList style={{ fontSize: "4vh" }} />
                more
              </a>
              <div class="dropdown-menu " aria-labelledby="navbarDropdown">
                <Link class="nav-link" to="/contact">
                  Contact
                </Link>
                <Link class="nav-link" to="/service">
                  Service
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="nav-link" to="/address">
                  Address
                </Link>
                <Link class="nav-link" to="/search">
                  Search
                </Link>
              </div>
      </li> */}
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2 mr-8"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
              <Link className=" nav-link p-0 " to="/search"></Link>
            </button>

            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link ml-3" to="/">
                  Login
                  <BsPersonLinesFill style={{ fontSize: "3vh" }} />
                </Link>
              </li>
              <li class="nav-item ml-4 mr-4 active">
                <Link class="nav-link" to="/signup">
                  SignUp
                  <BsFillPersonPlusFill style={{ fontSize: "3vh" }} />
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
