import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  // const [UserData, setUserData] = useState([]);

  // const [signupdata, setsignupdata] = useState([]);
  const navigate = useNavigate();

  const [error, seterror] = useState({});
  const [Data, setData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const emailValidator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const ChangeHnadle = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const verify = () => {
    let localErr = {};
    let valid = true;

    if (Data.Name.length === 0) {
      localErr.Name = "please enter name";
      valid = false;
    } else if (Data.Name.length <= 4) {
      localErr.Name = "invalid name";
      valid = false;
    }

    if (Data.Email.length === 0) {
      localErr.Email = "please ent  er email";
      valid = false;
    } else if (!emailValidator.test(Data.Email)) {
      localErr.Email = "invalid email";
      valid = false;
    }

    if (Data.Password.length === 0) {
      localErr.Password = "please enter password";
      valid = false;
    } else if (!passwordValidator.test(Data.Password)) {
      localErr.Password = "invalid password";
      valid = false;
    }
    seterror(localErr);
    return valid;
  };

  const saveData = async (e) => {
    e.preventDefault();

    if (verify()) {
      try {
        const response = await axios.post(
          "http://localhost:4500/user/register",
          {
            name: Data.Name,
            email: Data.Email,
            password: Data.Password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // const saveData = (e) => {
  //   e.preventDefault();

  //   if (verify()) {
  //     let signupGetData = JSON.parse(localStorage.getItem("user")) || [];
  //     console.log(signupGetData)
  //     let abc = signupGetData.find((e) => e.Email === Data.Email);

  //     if (abc) {
  //       alert("already exists");
  //     } else {
  //       let localData = signupGetData.concat(Data);
  //       setsignupdata(localData);
  //       localStorage.setItem("user", JSON.stringify(signupdata));
  //     }
  //     setData({
  //       Name: "",
  //       Email: "",
  //       password: "",
  //     });
  //   }
  // }

  return (
    <>
      <h3>{Data.Name}</h3>
      <h3>{Data.Email}</h3>
      <h3>{Data.Password}</h3>

      {/* <h3>{UserData.Name}</h3>
      <h3>{UserData.Email}</h3>
      <h3>{UserData.Password}</h3> */}
      {/* form-group */}

      <form className="container-fluid custom-form">
        <div class=" row align-center">
          <div className="col-md-6 p-3">
            <label
              for="staticName"
              class="col-form-label"
              style={{ fontSize: "3vh" }}
            >
              Full Name
            </label>
            <div class="">
              <input
                type="text"
                className="form-input"
                id="staticName"
                value={Data.Name}
                name="Name"
                onChange={ChangeHnadle}
              />
            </div>
            {error.Name && <i>{error.Name}</i>}
            <label
              for="staticEmail"
              class=" col-form-label"
              style={{ fontSize: "3vh" }}
            >
              Email
            </label>
            <div class="">
              <input
                type="text"
                className="form-input"
                id="staticEmail"
                name="Email"
                value={Data.Email}
                onChange={ChangeHnadle}
              />
            </div>
            {error.Email && <i>{error.Email}</i>}
            <label
              for="inputPassword"
              class=" col-form-label"
              style={{ fontSize: "3vh" }}
            >
              Password
            </label>
            <div class="">
              <input
                type="password"
                class="form-input"
                id="inputPassword"
                value={Data.Password}
                name="Password"
                onChange={ChangeHnadle}
              />
            </div>
            {error.Password && <i>{error.Password}</i>}
            <div className="Policy-Text">
              <div>
                <i>
                  By continuing,you agree to{" "}
                  <i style={{ color: "blue" }}>SHOPLI</i> , Terms of Use and{" "}
                  <i style={{ color: "blue" }}>Privacy Policy</i>.
                </i>
              </div>

              <button
                className="btn text-center btn-custom "
                onClick={saveData}
              >
                CONTINUE
              </button>
            </div>
          </div>
          <div className="col-sm-6 p-0">
            <img
              src="https://i.pinimg.com/736x/fe/20/e5/fe20e5572cf901ea950e5728870c422f.jpg"
              className=""
              style={{ height: "100%", width: "100%" }}
              alt="..."
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
