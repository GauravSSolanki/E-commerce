import React from "react";
import { useState } from "react";

function NewsLetter() {
  const [Data, setData] = useState("");
  const emailValidator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [Error, setError] = useState();

  const HandleChnage = (event) => {
    setData(event.target.value);
  };

  const HnadleClick = (e) => {
    e.preventDefault();
    if (emailValidator.test(Data)) {
      let obj = {};
      let getData = JSON.parse(localStorage.getItem("Consumer")) || [];
      let updatedobj = { ...obj, Email: Data };
      let updateArr = [...getData, updatedobj];
      localStorage.setItem("Consumer", JSON.stringify(updateArr));
      setData("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <section className="newsletter">
        <div class="newsletter-text">
          <h3>Sign Up For Newsletters</h3>
          <h5>
            get e-mail updates about out latest shop and
            <span>special offers</span>
          </h5>
        </div>
        <div>
          <div class="form">
            <input
              type="email"
              placeholder="Your email address"
              id="email-address-input"
              name="newsletter"
              value={Data}
              onChange={HandleChnage}
            />

            <button onClick={HnadleClick}>Sign Up</button>
          </div>
          <p>
            {Error && (
              <i style={{ color: "red" }}>Error: Fill Valid email please!</i>
            )}
          </p>
          <p>{!Error && <i style={{ color: "green" }}>Submitted</i>}</p>
        </div>
      </section>
    </>
  );
}

export default NewsLetter;
