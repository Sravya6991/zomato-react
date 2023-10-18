import React, {useState, useEffect} from 'react'
import HeaderRes from '../Restaurants/HeaderRes';
import axios from 'axios'
import DisplayOrder from './DisplayOrder';

const ourl = "http://localhost:8000/order";

const ViewOrder = () => {
    const [orders, setOrders] = useState()

    let userInfo = sessionStorage.getItem("userInfo");
    let data = JSON.parse(userInfo);

    useEffect(() => {
        axios.get(`${ourl}?email=${data.email}`, {method: 'GET'})
        .then((res)=> {
            console.log(res.data)
            setOrders(res.data)
        })
    },[])

  return (
    <div>
        <HeaderRes />
        <DisplayOrder orderData={orders}/>
    </div>
  )
}

export default ViewOrder