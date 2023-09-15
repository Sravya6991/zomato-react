import React  from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "../../styles/details.css";
import PlaceOrderAuth from "./PlaceOrderAuth";


const PlaceOrder = (props) => {
    const renderOrder = (props) => {
        const userInfo = sessionStorage.getItem("userInfo");
        if(userInfo === "") {
            return(
            <>
                <Header />
                <div className="container">
                <p>
                    Please Login to place order! If not already login, click 'Signup'
                    and login :){" "}
                </p>
                <Link to="/login">
                    Login
                </Link>
                </div>
            </>
            )
        } else {
           let data = JSON.parse(userInfo);
            console.log(data);
            const rest_name = props.match.params.restName;
            return(
            <PlaceOrderAuth orderData={data} restName={rest_name} history={props.history}/>
            )
        }
    }

    return (
        <>
        {renderOrder(props)}
        </>
    )

 
}

export default PlaceOrder;

