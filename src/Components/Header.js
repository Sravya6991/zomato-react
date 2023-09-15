import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// const url = "http://localhost:5000/auth/userInfo";

export default class Header extends Component {
    constructor(){
        super()
        this.state = {
            userData: ''
        }
    }

    handleLogout = () => {
        // sessionStorage.setItem("loginStatus", "loggedOut");
        // sessionStorage.setItem("userInfo", "")
        // sessionStorage.setItem("mealId", "")
        // sessionStorage.setItem("mealId", "")
        sessionStorage.clear()
        sessionStorage.removeItem("tk")
        
        this.setState({userData: " "})
        this.props.history.push("/")
    }

    conditionalHeader = () => {
        if(this.state.userData.name) {
            let data = this.state.userData
            sessionStorage.setItem("loginStatus", "loggedIn")
            sessionStorage.setItem("userInfo", JSON.stringify(data))
            return (
                <div className=''>
                    <Link to={"/"} className="btn login mt-3">
                        <span>Hi {data.name}</span>
                    </Link>
                    <button onClick={this.handleLogout} className="btn text-light bg-danger register mt-3" style={{width: '50%', margin: '10px auto' }}>
                        Logout
                    </button>
                </div>
            )
        } else {
            return (
                <div className='auth d-flex justify-content-end align-center me-4'>
                    <Link to="/login" className="btn login mt-3">
                        LogIn    
                    </Link>  
                    <Link to="/register" className="btn register mt-3">
                        Create an account    
                    </Link>  
                </div>
            )
        }
    }
  render() {
    return (
      <>
        {this.conditionalHeader()}
      </>
    )
  }

//   componentDidMount() {
//     fetch(url, {
//         method: 'GET',
//         headers: { 
//             "x-access-token": sessionStorage.getItem("tk")
//         }
//     })
//     .then(res => res.json())
//     .then(data =>{
//         console.log(data)
//         this.setState({userData: data})
//     })
//   }
}
