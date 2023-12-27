import React from "react";
import { useState } from "react";

function CartProduct({ CartProduct, idx,Discount }) {
  const [quantity, setquantity] = useState(1);
  
  const handleQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setquantity(newQuantity);

    let getData =JSON.parse(localStorage.getItem("cartData")) || [];
    let localData = [...getData];
    // Find the product in the localData array by index (idx)
    let updatedProduct = { ...localData[idx], quantity: newQuantity };
    // Update the localData array with the modified product
    localData[idx] = updatedProduct;
    console.log(updatedProduct);
    localStorage.setItem("cartData", JSON.stringify(localData));
  };

  const handleDelete = (idx) => {
    let getCard = JSON.parse(localStorage.getItem("cartData")) || [];
    let localData = [...getCard];
    localData.splice(idx, 1);
    localStorage.setItem("cartData", JSON.stringify(localData));
  };

  return (
    <>
      <tr>
        <td>
          <figure class="itemside">
            <div class="aside">
              <img
                src={CartProduct.images[0]}
                class="img-sm"
                style={{ height: "15vh" }}
              />
            </div>
            <figcaption class="info">
              <h6 class="title text-dark">
                {CartProduct.title}
              </h6>
              <p class="text-black">{CartProduct.brand}</p>
            </figcaption>
          </figure>
        </td>
        <td>
          <select
            id="quantity"
            name="quantity"
            onChange={handleQuantity}
            value={quantity}
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
              {CartProduct.price}Rs
            </h6>
          </div>
        </td>
        <td>
          <div class="price-wrap">
            <var class="Total"></var>
            <h6 class="" style={{ color: "black" }}>
              {(quantity * CartProduct.price * (100 - Discount)) /
                100}{" "}
              Rs
            </h6>
            <h6>Discount : {Discount}%</h6>
          </div>
        </td>
        <td class="text-right">
          <button onClick={() => handleDelete(idx)} class="btn btn-danger">
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartProduct;
