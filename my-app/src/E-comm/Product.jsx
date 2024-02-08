import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import "./product.css";
import axios from "axios";

function Product({ product, id }) {
  const [ITEm, setITEm] = useState("");
  const [token, settoken] = useState("");

  // const [quantity, setquantity] = useState(1);

  // const addcart = (item) => {
  //   let localData = { ...item, quantity:1 };
  //   let getData = JSON.parse(localStorage.getItem("cartData")) || [];
  //   if (!getData.some((item) => item.id === id)) {
  //     let localArr = getData.concat(localData);
  //     // let localArr=[];
  //     localStorage.setItem("cartData", JSON.stringify(localArr));
  //     setITEm(false);
  //     return;
  //   } else {
  //     setITEm(true);
  //   }
  // };

  const addcart = async (item, id) => {
    // const data = {
    //   price: item.price,
    //   id: id,
    //   quantity: 1,
    // };

    if (token) {
      const res = await axios.post(
        "http://localhost:4500/cart/addproduct",
        {
          price: item.price,
          productId: id,
          quantity: 1,
          brand: item.brand,
          rating: item.rating,
          title: item.title,
          description: item.description,
          discountPercentage: item.discountPercentage,
          thumbnail: item.thumbnail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setITEm(res.data);
    }
  };

  useEffect(() => {
    let token1 = localStorage.getItem("token");
    settoken(token1);
  }, [token]);

  // const Details = (item) => {
  //   localStorage.setItem("More-Detail", JSON.stringify(item));
  // };

  const showDetailsAlert = (item) => {
    Swal.fire({
      title: item.name,
      html: `
      <img src=${item.thumbnail} alt="..." className="Sweet-Alert-Img"/>
        <p>Description: ${item.description}</p>
        <p>Price: $${item.price}</p>
        `,
      icon: "image",
    });
  };

  return (
    <div className="text-center">
      <div className="product-profile">
        <img
          src={product.images[0]}
          onClick={() => showDetailsAlert(product)}
          alt={product.title}
        />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-success">Price: Rs {product.price}</p>
        <p><button
          className="button-15 "
          role="button"
          onClick={() => addcart(product, id)}
        >
          Add to Cart
        </button></p>
        <p style={{ color: "red" }}>{ITEm && <i>{ITEm}</i>}</p>
      </div>
    </div>
  );
}

export default Product;
