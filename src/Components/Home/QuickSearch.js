import React, { Component } from "react";
import QuickDisplay from "./QuickDisplay";

const qurl = "http://localhost:8000/quicksearch";

export class QuickSearch extends Component {
    constructor() {
        super();
        this.state = {
            quicksearch: ''
        }
    }

  render() {
    return (
        <div className={"container menu-container mt-3 mb-5"}>
          <div className={"row gap-4"}>
            {/* <a className={"col-12 col-md-3 card p-0"} href="cuisine.html">
              <div className={"row g-0"} style={{ height: "100%" }}>
                <div className="col-5">
                  <img
                    src=""
                    alt="breakfast"
                    className="img-fluid"
                    width="100%"
                  />
                </div>
                <div className="col-7">
                  <div className="card-body">
                    <h4 className="card-title">Breakfast</h4>
                    <p className="card-text">
                      Start your day with exclusive breakfast options
                    </p>
                  </div>
                </div>
              </div>
            </a> */}
            <QuickDisplay mealData={this.state.quicksearch}/>
          </div>
        </div>
    );
  }

  componentDidMount() {
    fetch(`${qurl}`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            this.setState({quicksearch: data})
        })
}
}


export default QuickSearch;
