import React from "react";
import { useState } from "react";

function Coupons({ setDiscount }) {
  const [coupon, setcoupon] = useState("");
  const SetDist = () => {
    // e.preventDefault();
    if (coupon == "First10") {
      setDiscount(10);
    } else if (coupon === "HAPPY15CRIST") {
      setDiscount(15);
    } else if (coupon === "CARA20") {
      setDiscount(20);
    } else {
      setDiscount(5);
    }
  };
  const Handlediscount = (event) => {
    setcoupon(event.target.value);
  };

  return (
    <>
      <form>
        <div class="form-group">
          <label>Have coupon?</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              onChange={Handlediscount}
              name="coupon"
              value={coupon}
              placeholder="Coupon code"
            />
            <span class="input-group-append">
              <button class="btn btn-primary" onClick={SetDist()}>
                Apply
              </button>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default Coupons;
