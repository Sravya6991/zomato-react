import React from 'react'

const DisplayOrder = (props) => {
    const renderData = ({orderData}) => {
        if(orderData) {
            return(
                orderData.map((item) => {
                    return(
                        <tr key={item.id} >
                            <td>{item.id}</td>
                            <td>{item.rest_name}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.cost}</td>
                        </tr >

                    )
                })
            )
        }
    }
   
  return (
    <div className='container'>
        <center><h4>Order is Confirmed</h4></center>
        <table className="table table-striped-columns">
            <thead>
                <tr>
                    <th>OrderId</th>
                    <th>Restaurant Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Cost</th>
                    <th>Item Names</th>
                </tr>
            </thead>
            <tbody>
                {renderData(props)}
                
            </tbody>
        </table>
        
    </div>
  )
}

export default DisplayOrder