import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "../../styles/details.css";
import "../../styles/menu.css";

import HeaderRes from "../Restaurants/HeaderRes";
import { ImageGallery } from "./ImageGallery";
import MenuList from "./MenuList";

const durl = "http://localhost:8000/details/";
const menuUrl = "http://localhost:8000/menu/";
const url = "http://localhost:8000";

export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      details: "",
      menu: "",
      userItems: "",
      userOrderData: "",
      totalPrice: "",
    };
  }

  addCart = (data) => {
    this.setState({ userItems: data });
    //console.log("userItems:", this.state.userItems);
    sessionStorage.setItem("menu", this.state.userItems);
  };

  proceed = () => {
    const menuId = sessionStorage.getItem("menu");
    let oid = [];

    menuId.split(",").map((item) => {
      return oid.push(parseInt(item));
    });
    //console.log(oid)
    fetch(`${url}/menuitems`, {
      method: "POST",
      body: JSON.stringify(oid),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("menuData:", data);
        this.setState({ userOrderData: data });
        let totalPrice = 0;
        data.map((item) => {
          return (totalPrice = totalPrice + parseFloat(item.menu_price));
        });
        sessionStorage.setItem("totalPrice", totalPrice);
        this.setState({ totalPrice: totalPrice });
      });
  };

  proceedPay = () => {
    this.props.history.push(`/placeorder/${this.state.details.restaurant_name}`)
  }

  render() {
    let { details } = this.state;
    return (
      <div>
        <HeaderRes />
        
        <section className="container-fluid container-md img-gallery position-relative">
          <img src={details.restaurant_thumb} alt={details.restaurant_name} />
          <button
            type="button"
            className="btn gallery-btn"
            data-bs-target="#image-gallery"
            data-bs-toggle="modal"
          >
            Click to see Image Gallery
          </button>
        </section>

        {/* <!-- modal image gallery trigger --> */}
        {{ details } && <ImageGallery images={details.image_gallery} />}

        <section className="container main-section mt-5">
          <h1 className="h1 text-start" id="res-title">
            {" "}
            {details.restaurant_name}
          </h1>
          <div className="d-flex justify-content-between text-center menu-wrapper">
            <Tabs>
              <TabList className="d-flex mb-0">
                <Tab className="menu-btn overview-btn">Overview</Tab>
                <Tab className="menu-btn contact-btn">Contact Us</Tab>
              </TabList>
              <TabPanel className="mx-4 mb-4">
                <h4>About this place</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="fw-semibold">Cuisine</th>
                      {details &&
                          details.cuisines.map((item) => (
                            <td>{item.cuisine_name}</td>
                          ))}
                    </tr>
                  <tr>
                  <th className="fw-semibold">Average Cost</th>
                      <td>{details.cost} for two people (approx.)</td>
                      
                  </tr>
                  <tr>
                      <th className="fw-semibold col-4">Rating</th>
                      <td className="col-8">We got a rating of {details.average_rating}/5. Our viewers
                        always say our restaurant is the {details.rating_text} in
                        this city.</td>
                    </tr>
                  <tr></tr>
                      
                    </tbody>
                  </table> 
              </TabPanel>
              <TabPanel  className=" mx-4 mb-4">
                <table className="table">
                  <tbody>
                    <tr>
                      <th className="fw-semibold col-4">Phone Number: </th>
                      <td className="col-8">+91 114004566</td>
                    </tr>
                    <tr>
                      <th className="fw-semibold col-4">{details.restaurant_name} </th>
                      <td className="col-8">{details.address}</td>
                    </tr>
                  </tbody>
                </table>
            
              </TabPanel>
            </Tabs>

            {/* <!-- Modal button --> */}
            <Link
              to={`/menu/${details.restaurant_id}`}
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#staticOrder"
              id="menu-order"
            >
              Order Menu
            </Link>
          </div>

          {/* <!-- Modal trigger --> */}
          <div className="modal fade" id="staticOrder" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title">{details.restaurant_name}</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row p-3">
                    <MenuList
                      menus={this.state.menu}
                      finalOrder={(data) => {
                        this.addCart(data);
                      }}
                    />
                  </div>
                </div>

                <div className="modal-footer justify-content-around align-items-center p-0">
                  <button
                    type="button"
                    id="pay-btn"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticIdentity"
                    onClick={this.proceed}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal identity trigger --> */}
          <div className="modal fade" id="staticIdentity" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title">{details.restaurant_name}</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <MenuList menus={this.state.userOrderData} />
                </div>
                <div className="modal-footer justify-content-around align-items-center p-0">
                  <div className="d-flex align-items-center">
                    <h2>Subtotal</h2>
                    <h4>Rs. {this.state.totalPrice}</h4>
                  </div>
                  <button
                    type="button"
                    id="pay-btn"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticIdentity"
                    onClick = {this.proceedPay}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  async componentDidMount() {
    const restId = this.props.match.params.id;

    const response = await axios.get(`${durl}${restId}`, { method: "GET" });
    //console.log(response.data[0])

    const menuData = await axios.get(`${menuUrl}${restId}`);
    //console.log(menuData.data)

    this.setState({ details: response.data[0], menu: menuData.data });
  }
}
