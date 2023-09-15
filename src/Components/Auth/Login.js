import React, { Component } from "react";
import Header from "../Header";

const url = "http://localhost:5000/auth/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "test1@gmail.com",
      password: "1234",
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(res=>res.json())
    .then(data => {
      console.log(data);
      if (data.auth === true) {
        sessionStorage.setItem("tk", data.token);
        this.props.history.push("/");
      } else {
        this.setState({ message: data.token });
      }
    })
  };

  render() {
    return (
      <>
        <Header />
        <div className="d-flex flex-column w-75 mx-auto">
          <h2 style={{ color: "red" }}>{this.state.message}</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn text-light bg-success"
            onClick={this.handleSubmit}
            style={{ width: "50%", margin: "10px auto" }}
          >
            Login
          </button>
        </div>
        <hr />
        <button className="btn btn-outline-secondary mb-3">
          <i
            className="fa-regular fa-envelope"
            style={{ color: "#de1231" }}
          ></i>
          &nbsp; Continue with gmail
        </button>
        <button className="btn btn-outline-secondary">
          <i className="fa-brands fa-facebook" style={{ color: "#18428c" }}></i>
          &nbsp; Continue with facebook
        </button>

        <div className="modal-footer mx-auto my-4">
          <p>
            Already had an account?
            <button
              className="btn text-danger"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              Login
            </button>
          </p>
        </div>
      </>
    );
  }
}

export default Login;
