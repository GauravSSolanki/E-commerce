import React, { useEffect,useState } from "react";
import './product.css'

function Product({product}) {

    const addcart = (item) => {
        // e.preventDefault()
        let getData = JSON.parse(localStorage.getItem("cartData")) || [];
        let localArr = getData.concat(item);
        localStorage.setItem("cartData", JSON.stringify(localArr));
      };

  return (
    <div className="text-center">
      <div className="product-profile ">
        <img src={product.images[0]} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-success">Price: Rs {product.price}</p>
        <button  className="Button"  onClick={() => addcart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
