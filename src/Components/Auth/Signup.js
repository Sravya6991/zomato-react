import React, { Component } from "react";
import Header from "../Header";

const url = "http://localhost:5000/auth/register";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit =() => {
    console.log(this.state)
    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(this.props.history.push("/login"))
    
  }

  render() {
    return (
      <>
        <Header />
        {/* style={{ height: "150px" }} */}
        <div className="d-flex flex-column w-75 mx-auto">    
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              className="form-control"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="address">Address: </label>
            <textarea
              className="form-control"
              rows="2"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone:
            </label>
            <input
              className="form-control"
              type="number"
              value={this.state.phone}
              name="phone"
              onChange={this.handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn text-light bg-success"
            onClick={this.handleSubmit}
            style={{ width: "50%", margin: "10px auto" }}
          >
            Register
          </button>

          <hr />
          <button className="btn btn-outline-secondary mb-3">
            <i
              className="fa-regular fa-envelope"
              style={{ color: "#de1231" }}
            ></i>
            &nbsp; Continue with gmail
          </button>
          <button className="btn btn-outline-secondary">
            <i
              className="fa-brands fa-facebook"
              style={{ color: "#18428c" }}
            ></i>
            &nbsp; Continue with facebook
          </button>
        </div>
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
