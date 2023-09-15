import React, { useState } from 'react'
import Header from "../Header";

const purl = "http://localhost:8000/placeorders";

const PlaceOrderAuth = (props) => {
    console.log(props)
    const {orderData, restName, history} = props
    const initialValues = {
        id: Math.floor(Math.random() * 10000),
        rest_name: restName,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        cost: sessionStorage.getItem("totalPrice"),
    };

    const [values, setValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
    
      const checkout = () => {
        console.log(values);
        fetch(purl, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then(history.push(`/vieworders`));
      };
    
    return (
        <>
          <Header />
          <div className="container">
            <h2>Order for {restName}</h2>
            <div className="row bg-success text-light">
              <div className="col-md-6 form-group">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <textarea
                  value={values.address}
                  name="address"
                  onChange={handleChange}
                  className="form-control"
                  cols="6"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <h4>Total Price: Rs. {values.cost}</h4>
            <button className="btn btn-success" onClick={checkout}>
              checkout
            </button>
          </div>
        </>
      );
}

export default PlaceOrderAuth