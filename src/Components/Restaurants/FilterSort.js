import React, { Component } from 'react'
import axios from 'axios';

const url = "http://localhost:8000/restaurants/";

export default class FilterSort extends Component {
  filterSort = (e) => {
    const sort = e.target.value
    const mealId = sessionStorage.getItem("mealId")
    sessionStorage.setItem("sort", sort);

    let sortUrl;

    if(sort<1 ) {
      sortUrl = `${url}${mealId}?sort=${sort}`;
    }
    else {
      sortUrl = `${url}${mealId}`
    } 

    axios.get(sortUrl).then((res) => {
      console.log(res.data)
      this.props.restPerSort(res.data)
    });

  }
  
  render() {
    return (
        <div class="radio-wrapper" onChange={this.filterSort}>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="lowtohg"
            name="sort"
            value="1"
          />
          <label for="lowtohg" class="form-check-label">
            Price low to high
          </label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="hgtolow"
            name="sort"
            value="-1"
          />
          <label for="hgtolow" class="form-check-label">
            Price high to low
          </label>
        </div>
      </div>
      
    )
  }
}
