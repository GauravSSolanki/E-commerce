import React, { useState } from "react";
import "./product.css";

function Product({ product, id }) {
  const [ITEm, setITEm] = useState(false);
  // const [quantity, setquantity] = useState(1);

  const addcart = (item) => {
    let localData = { ...item, quantity: 1 };
    let getData = JSON.parse(localStorage.getItem("cartData")) || [];
    if (!getData.some((item) => item.id === id)) {
      let localArr = getData.concat(localData);
      // let localArr=[];
      localStorage.setItem("cartData", JSON.stringify(localArr));
      setITEm(false);
      return;
    } else {
      setITEm(true);
    }
  };

  const Details = (item) => {
    localStorage.setItem("More-Detail", JSON.stringify(item));
  };

  return (
    <div className="text-center">
      <div className="product-profile" onClick={() => Details(product)}>
        <img src={product.images[0]} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-success">Price: Rs {product.price}</p>
        <button
          className="button-15"
          role="button"
          onClick={() => addcart(product, id)}
        >
          Add to Cart
        </button>
        <p style={{ color: "red" }}>
          {ITEm && <i>This Item is already Present in cart</i>}
        </p>
      </div>
    </div>
  );
}

export default Product;
