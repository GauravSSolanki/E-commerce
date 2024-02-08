import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function CartProduct({ CartP, Discount, getdata }) {
  const [quantity, setquantity] = useState(1);
  const [token, settoken] = useState("");

  const handleQuantity = async (event) => {
    try {
      const newQuantity = parseInt(event.target.value, 5);
      setquantity(newQuantity);
      if (token) {
        const response = await axios.put(
          `http://localhost:4500/cart/quantity/${CartP.productId}`,
          {
            quantity: event.target.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log("Item updated:", response.data);
        getdata();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
    // let getData = JSON.parse(localStorage.getItem("cartData")) || [];
    // let localData = [...getData];
    // // Find the product in the localData array by index (idx)
    // let updatedProduct = { ...localData[idx], quantity: newQuantity };
    // // Update the localData array with the modified product
    // localData[idx] = updatedProduct;
    // console.log(updatedProduct);
    // localStorage.setItem("cartData", JSON.stringify(localData));
  };

  // const handleDelete = (idx) => {
  // let getCard = JSON.parse(localStorage.getItem("cartData")) || [];
  // let localData = [...getCard];
  // localData.splice(idx, 1);
  // localStorage.setItem("cartData", JSON.stringify(localData));
  // };

  const handleDelete = async (idx) => {
    try {
      const response = await axios.delete(
        `http://localhost:4500/cart/delete/${idx}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      //  console.log(response.data);
      //   return response.data;
      getdata();
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  useEffect(() => {
    let token1 = localStorage.getItem("token");
    settoken(token1);
  }, [token]);

  return (
    <>
      <tr>
        <td>
          <figure class="itemside">
            <div class="aside">
              <img
                src={CartP.thumbnail}
                class="img-sm"
                style={{ height: "15vh" }}
              />
            </div>
            <figcaption class="info">
              <h6 class="title text-dark">{CartP.title}</h6>
              <p class="text-black">Brand:{CartP.brand}</p>
            </figcaption>
          </figure>
        </td>
        <td>
          <select
            id="quantity"
            name="quantity"
            onChange={handleQuantity}
            value={CartP.quantity}
          >
            {[...Array(10).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </td>
        <td>
          <div class="price-wrap">
            <var class="price">{}</var>
            <h6 class="" style={{ color: "black" }}>
              {CartP.price}Rs
            </h6>
          </div>
        </td>
        <td>
          <div class="price-wrap">
            <var class="Total"></var>
            <h6 class="" style={{ color: "black" }}>
              {(
                (CartP.quantity * CartP.price * (100 - Discount)) /
                100
              ).toFixed(2)}{" "}
              Rs
            </h6>
            <h6>{CartP.discountPercentage}% off</h6>
          </div>
        </td>
        <td class="text-right">
          <button
            onClick={() => handleDelete(CartP.productId)}
            class="btn btn-danger"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartProduct;
