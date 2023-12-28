import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { useState } from "react";
function Login() {
  const [SignupData, setSignupData] = useState([]);
  const [Data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [error, seterror] = useState({});

  const emailValidator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const FillData = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const CheckUser = (err) => {
    err.preventDefault();
    if (verify()) {
      let abc = SignupData.find((e) => e);

      if (!abc) {
        alert("NO USer found");
      } else if (abc.Email === Data.Email && abc.Password === Data.Password) {
        navigate("/Data");
        localStorage.setItem("loggedinData", JSON.stringify(Data));
      } else {
        alert("email & password not exists");
      }
    }
  };

  const verify = () => {
    let LocalErr = {};
    let valid = true;
    if (!emailValidator.test(Data.Email)) {
      LocalErr.email = "invalid Email";
      valid = false;
    } else if (Data.Password.length <= 1) {
      LocalErr.password = "password lenght is not metched";
      valid = false;
    }
    seterror(LocalErr);
    return valid;
  };

  useEffect(() => {
    let abc = JSON.parse(localStorage.getItem("user"));
    setSignupData(abc);
  }, []);

  return (
    <div className="layout">
      <form className="container-fluid">
        {/* {Data.Email} */}
        <div class=" row custom-for">
          <div className="col-md-4 offset-md-2 text-center">
            <label
              for="staticEmail"
              class="col-form-label"
              style={{ color: "black", fontWeight: "400", fontSize: "4vh" }}
            >
              Email
            </label>
            <div class="">
              <input
                type="text"
                name="Email"
                className="form-input"
                id="staticEmail"
                onChange={FillData}
              />
            </div>
            {error.email && <i>{error.email}</i>}

            <label
              for="inputPassword"
              class=" col-form-label"
              style={{ color: "black", fontWeight: "400", fontSize: "4vh" }}
            >
              Password
            </label>
            <div class="">
              <input
                type="text"
                className="form-input"
                name="Password"
                id="staticEmail"
                onChange={FillData}
              />
            </div>
            {error.password && <i>{error.password}</i>}

            <div class="form-group m-auto text-center">
              <button
                className="btn btn-custom mt-3 pl-4 pr-4"
                onClick={CheckUser}
              >
                Login
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/fe/20/e5/fe20e5572cf901ea950e5728870c422f.jpg"
              className=""
              style={{ height: "100%", width: "100%" }}
              alt="..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
