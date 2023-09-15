import React, { Component } from 'react'
import axios from 'axios';
import "../../styles/cuisine.css";
import "../../styles/media.css";

import HeaderRes from "./HeaderRes";
import FilterCuisine from "./Filter/FilterCuisine";
import FilterCost from "./Filter/FilterCost";
import FilterSort from "./FilterSort";
import FilterDisplay from "./FilterDisplay";
import Paginations from './Paginations';

const resturl = "http://localhost:8000/restaurants/";

export default class Restaurants extends Component {
    constructor() {
        super();
        this.state = {
          restaurants: ''
      }
    }

    setFilterData = (data) => {
      this.setState({
        restaurants: data
      });
    }

    render() {
        return (
            <div>
              <HeaderRes /> 
        
              <h1 class="fs-2 cuisine-h1 ">Breakfast Places in Mumbai</h1>
        
              <main class="container d-lg-flex mb-4">
                <p id="filter-btn" class="container d-lg-none">
                  <span
                    class="btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-filter"
                    aria-controls="collapse-filter"
                  >
                    Filter/Sort
                  </span>
                </p>
                <section
                  class="filter-section p-1 collapse d-lg-block"
                  id="collapse-filter"
                >
                  <h2 class="p-0 fw-semibold">Filters</h2>
                  <h3 class="p-0">Select Location</h3>
                  <select class="form-select mx-auto w-75 my-2">
                    <option>Select Location</option>
                  </select>
        
                  <FilterCuisine mealId={this.props.match.params.mealId} restPerCuisine={(data) => {this.setFilterData(data)}}/>
        
                  <FilterCost mealId={this.props.match.params.mealId} restPerCost={(data) => this.setFilterData(data)} lcost={data => data.lcost} hcost={data => data.hcost}/>
        
                  <h2 class="p-0 fw-semibold">Sort</h2>
                  <FilterSort  restPerSort={(data) => this.setFilterData(data)}/>     
                </section>
        
                <section class="content-section m-0 m-lg-3">
                
                  <FilterDisplay restaurants={this.state.restaurants} />    
                
                </section>
              </main>

              <Paginations restPerPage={(data) => this.setFilterData(data)}/>
            </div>
            
        );
    }

    componentDidMount() {
        const mealId = this.props.match.params.mealId;
        // console.log(mealId);
        sessionStorage.setItem('mealId', mealId)
        axios.get(`${resturl}${mealId}`, {method: 'GET'})
              .then((res) => this.setState({restaurants: res.data}));
    }
  
};
