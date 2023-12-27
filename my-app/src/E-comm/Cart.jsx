import React from "react";
import { useState, useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

import play from "../imgs/Footer/play.jpg";

import { CiStar } from "react-icons/ci";

import logo from "../imgs/Footer/logo.png";
import Product from "./Product";
import CartProduct from "./CartProduct";
import Coupons from "./Coupons";
import Home from "./Home";

function Cart() {
  const [Products, setProducts] = useState([]);
  const [Discount, setDiscount] = useState(0);

  const calculateCartTotal = (Products) => {
    return Products.reduce((total, product) => {
      // Assuming each product has a 'quantity' and 'price' property
      const productTotal = product.quantity * product.price;
      return Math.round(total + productTotal);
    }, 0);
  };
  const totalAmount = calculateCartTotal(Products);
  // console.log("Total Amount:", totalAmount);

  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("cartData")) || [];
    setProducts(getData);
  }, [Products]);

  // console.log(Products);

  return (
    <>
      <header class="section-header">
        <section class="header-main border-bottom">
          <div class="container">
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
                    <span class="badge badge-pill badge-danger notify">1</span>
                  </div>
                  <div class="widget-header icontext">
                    <a href="#" class="icon icon-sm rounded-circle border">
                      <i class="fa fa-user"></i>
                    </a>
                    <div class="text">
                      <span class="text-muted">Welcome!</span>
                      <div>
                        <a href="#">Sign in</a> |<a href="#">Register</a>
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
                    {Products.map((Product, idx) => {
                      return (
                        <>
                          <CartProduct
                            CartProduct={Product}
                            idx={idx}
                            Discount={Discount}
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
                    <i class=""></i> Continue shopping{" "}
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

            <aside class="col-md-3">
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
                    <dt>Discount= {Discount}%</dt>
                    <dd class="text-right h6">
                      -{totalAmount * (Discount / 100)}
                    </dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt>Total:</dt>
                    <dd class="text-right h6">
                      <strong>
                        {((totalAmount * (100 - Discount)) / 100).toFixed(2)}
                      </strong>
                    </dd>
                  </dl>
                  <hr />
                  <p class="text-center mb-3">
                    <img src={play} />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="section-name bg padding-y">
        <div class="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
