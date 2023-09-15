import React, { Component } from "react";

export default class MenuList extends Component {
    orderId = [];

    placeOrder = (id) => {
        this.orderId.push(id);
        // console.log("OrderId:", this.orderId);
        this.props.finalOrder(this.orderId);
    }

    removeOrder = (id) => {
        if(this.orderId.indexOf(id) > -1) {
            this.orderId.splice(this.orderId.indexOf(id), 1);
        }
        //console.log(this.orderId)
        this.props.finalOrder(this.orderId)
    }

    renderMenu = ({menus}) => {
        if(menus) {
            return menus.map((item) => (
                <div className="col-12 border-bottom d-flex justify-content-between mb-3" key={item.menu_id}>
                    <div className="col-8 order-content">
                        <div className="veg border border-success">
                            {(item.menu_type ==='vegetarian') ? (<div className="circle"></div>) : (<div className="circle nveg"></div>) }
                        </div>

                        <h4>{item.menu_name}</h4>
                        <h5>Rs. {item.menu_price}</h5>
                        <p>
                            {item.description}
                        </p>
                    </div>
                    <div className="col-3 order-img rounded-1">
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <div className="d-flex">
                            <button
                                type="button"
                                className="add rounded-1"
                                onClick={() => {
                                    this.placeOrder(item.menu_id)
                                }}
                            >
                                <span className="glyphicon glyphicon-plus">Add</span>
                            </button>
                            <button
                                type="button"
                                className="add sub rounded-1"
                                onClick={() => {
                                    this.removeOrder(item.menu_id)
                                }}
                            >
                                <span className="glyphicon glyphicon-minus">Sub</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
            ))
        }
        
    }
  render() {
    return (
        <>{this.renderMenu(this.props)}</>
    )
  }
}
