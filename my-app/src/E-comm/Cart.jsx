import React from "react";
import { useState, useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import axios from "axios";

import play from "../imgs/Footer/play.jpg";

// import { CiStar } from "react-icons/ci";

import logo from "../imgs/Footer/logo.png";
// import Product from "./Product";
import CartProduct from "./CartProduct";
import Coupons from "./Coupons";
// import Home from "./Home";
import Footer from "./Footer";

function Cart() {
  const [Products, setProducts] = useState([]);
  const [Discount, setDiscount] = useState(0);
  const [token, settoken] = useState("");

  const calculateCartTotal = (Products) => {
    return Products.reduce((total, product) => {
      const productTotal = product.quantity * product.price;
      return Math.round(total + productTotal);
    }, 0);
  };
  const totalAmount = calculateCartTotal(Products);

  const FinalCartTotal = (Products) => {
    return Products.reduce((total, product) => {
      const productTotal =
        (product.quantity *
          product.price *
          (100 - product.discountPercentage)) /
        100;
      return Math.round(total + productTotal);
    }, 0);
  };
  const FinalAmount = FinalCartTotal(Products);

  const [isDivVisible, setDivVisibility] = useState(false);

  const toggleVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  // useEffect(() => {
  //   let getData = JSON.parse(localStorage.getItem("cartData")) || [];
  //   setProducts(getData);
  // }, [Products]);

  const getcartproduct = async () => {
    try {
      const res = await axios.get("http://localhost:4500/cart/allproducts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getcartproduct();
  }, []);

  useEffect(() => {
    let token1 = localStorage.getItem("token");
    settoken(token1);
  }, [token]);

  // console.log(Products);

  return (
    <>
      <header class="section-header">
        <section class="header-main border-bottom">
          <div class="container bg-img">
            <div class="row align-items-center">
              <div class="col-lg-2 col-4">
                <h4 className="">
                  <p class="text-center mb-3">
                    <img src={logo} alt="logo" />
                  </p>
                </h4>
              </div>
              <div class="col-lg-6 col-sm-12">
                <form action="#" class="search">
                  <div class="input-group w-100">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="submit">
                        <i class="fa fa-search">Search</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="col-lg-4 col-sm-6 col-12">
                <div class="widgets-wrap float-md-right">
                  <div class="widget-header  mr-3">
                    <a href="#" class="icon icon-sm rounded-circle border">
                      <i class="fa fa-shopping-cart"></i>
                    </a>
                    <span class="badge badge-pill badge-danger notify">
                      Items :{Products.length}
                    </span>
                  </div>
                  <div class="widget-header icontext">
                    <a href="#" class="icon icon-sm rounded-circle border">
                      <i class="fa fa-user"></i>
                    </a>
                    <div class="text">
                      <h4 class="text-dark">Welcome!</h4>
                      <div>
                        <Link to="/">
                          <i>Sign in</i>{" "}
                        </Link>
                        |{" "}
                        <Link to="/signup">
                          <i>Register</i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section class="section-pagetop bg-promary text-center">
        <div class="container">
          <h2 class="title-page">Shopping cart</h2>
        </div>
      </section>

      <section class="section-content padding-y">
        <div class="container">
          <div class="row">
            <main class="col-md-9">
              <div class="card">
                <table class="table table-borderless table-shopping-cart">
                  <thead class="text-muted">
                    <tr class="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="80">
                        Price
                      </th>
                      <th scope="col" width="80">
                        Total
                      </th>
                      <th scope="col" class="text-right" width="200">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Products.map((Product) => {
                      return (
                        <>
                          <CartProduct
                            CartP={Product}
                            Discount={Product.discountPercentage}
                            getdata={getcartproduct}
                          />
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <div class="card-body border-top p-2">
                  <a href="#" class="btn btn-primary float-md-right">
                    Make Purchase <i class=""></i>{" "}
                  </a>
                  <a href="#" class="btn btn-light float-md-left">
                    {" "}
                    <Link to="/Home">Continue shopping </Link>
                  </a>
                </div>
              </div>

              <div class="alert alert-primary mt-3">
                <p class="icontext">
                  <i class="icon text-success"></i> Free Delivery within 1-2
                  weeks
                </p>
              </div>
            </main>

            <aside class="col-md-3" style={{ backgroundColor: "#e3e6f3" }}>
              <p class="text-center mb-3">
                <img src={logo} alt="logo" />
              </p>
              <div class="card mb-3">
                <div class="card-body p-3">
                  <Coupons setDiscount={setDiscount} />
                </div>
              </div>
              <div className="card ">
                <div class="card-body p-3">
                  <dl class="dlist-align">
                    <dt>Total price:</dt>
                    <dd class="text-right h6">+{totalAmount}</dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt className="text-success"> Discount in Rs</dt>
                    <dd class="text-right text-success h6">
                      -{totalAmount - FinalAmount}
                    </dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt>Extra Total after Discount</dt>
                    <dd class="text-right h6">
                      <strong>: {Math.round(FinalAmount*((100-Discount)/100))}</strong>
                    </dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt>Total:</dt>
                    <dd class="text-right h6">
                      <strong>: {Math.round(FinalAmount)}</strong>
                    </dd>
                  </dl>
                  
                  <hr />
                  <p class="text-center mb-3">
                    <img src={play} />
                  </p>
                  <dl class="dlist-align">
                    <dd class="text-right h6">
                      <button
                        className="btn-success"
                        style={{ width: "15vw", padding: "2vh" }}
                      >
                        Place Order
                      </button>
                    </dd>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="section-name bg padding-y">
        <div class="container">
          <h6>
            <button onClick={toggleVisibility}>
              Payment and refund policy
            </button>
          </h6>

          {isDivVisible && (
            <div id="" className="">
              <p>
                Clearly outline the conditions under which a customer is
                eligible for a refund. This may include defective products,
                damaged items during shipping, or other valid reasons. <br />{" "}
                Explain the step-by-step process for customers to initiate a
                refund, including the contact method, required information, and
                any forms they need to fill out.
                <br />
                Refund Timeframe: Clearly state the timeframe within which
                customers can expect to receive their refund. This may vary
                depending on the payment method and processing times.
              </p>
              <p>
                Specify the method through which refunds will be issued. This
                may include crediting the original payment method, providing
                store credit, or other alternatives.
                <br />
                Clearly mention any items or services that are non-refundable.
                This could include digital products, customized items, or
                perishable goods.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer class="section-footer border-top padding-y">
        <div class="container">
          <p class="float-md-right">
            &copy; Copyright 2020 All rights reserved
          </p>
          <p>
            <a href="#">Terms and conditions</a>
          </p>
        </div>
      </footer>

      <Footer />
    </>
  );
}

export default Cart;

// brand
// :
// "Apple"
// category
// :
// "smartphones"

// :
// "An apple mobile which is nothing like apple"
// discountPercentage
// :
// 12.96
// id
// :
// 1
// images
// :
// (5) ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg']
// price
// :
// 549
// rating
// :
// 4.69
// stock
// :
// 94
// thumbnail
// :
// "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
// title
// :
// "iPhone 9"
