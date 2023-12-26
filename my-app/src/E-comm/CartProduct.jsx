import React from "react";
import { useState } from "react";


function CartProduct({Product,idx}) {

    const [Quantity, setQuantity] = useState(1);

    const handleQuantity = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      setQuantity(newQuantity);
    };   

    const handleDelete=(idx)=>{
       let getCard = JSON.parse(localStorage.getItem('cartData')) || []
        let localData =[...getCard] 
       localData.splice(idx,1)
         localStorage.setItem("cartData",JSON.stringify(localData))
    }


  return (
    <>
      <tr>
        <td>
          <figure class="itemside">
            <div class="aside">
              <img
                src={Product.images[1]}
                class="img-sm"
                style={{ height: "15vh" }}
              />
            </div>
            <figcaption class="info">
              <a href="#" class="title text-dark">
                {Product.title}
              </a>
              <p class="text-muted small">{Product.brand}</p>
            </figcaption>
          </figure>
        </td>
        <td>
          <select
            id="quantity"
            name="quantity"
            onChange={handleQuantity}
            value={Quantity}
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
            <h6 class="" style={{color:"black"}}>{Product.price}Rs</h6>
          </div>
        </td>
        <td>
          <div class="price-wrap">
            <var class="Total">{}</var>
            <h6 class="" style={{color:"black"}}>{(Product.price)*Quantity} Rs </h6>
          </div>
        </td>
        <td class="text-right">
          <button onClick={()=>handleDelete(idx)} class="btn btn-danger">
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartProduct;
